import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getSecureStore, setSecureStore } from "@/utils/secureStore";
import { storageKeys } from "@/constants";
import { setHeader } from "@/utils";
import Constants from "expo-constants";

// 토큰 갱신 중인지 확인하는 변수
let isRefreshing = false;
// 401 에러로 인해 대기 중인 요청 배열
let failedRequestQueue: {
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}[] = [];

// 서버 URL 가져오기 (EAS 환경변수 우선 지원)
const getServerBaseUrl = () => {
  // 1. EAS 런타임 환경변수 (Constants.expoConfig를 통해 접근)
  const easEnvUrl =
    Constants.expoConfig?.extra?.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL;

  // 2. 빌드 시점 환경변수 (개발 환경용)
  const buildEnvUrl = process.env.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL;

  // 3. app.json의 extra 설정 (fallback)
  const extraUrl = Constants.expoConfig?.extra?.serverBaseUrl;

  console.log("🔍 환경변수 디버깅:");
  console.log("- __DEV__:", __DEV__);
  console.log(
    "- EAS 런타임 환경변수 (Constants.expoConfig?.extra?.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL):",
    easEnvUrl
  );
  console.log(
    "- 빌드 시점 환경변수 (process.env.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL):",
    buildEnvUrl
  );
  console.log("- app.json extra.serverBaseUrl:", extraUrl);

  // 전체 Constants.expoConfig 구조 확인 (디버깅용)
  console.log("🔍 Constants.expoConfig?.extra:", Constants.expoConfig?.extra);

  // 환경변수 확인을 위한 디버깅
  console.warn("🚨 환경변수 체크:", {
    isDev: __DEV__,
    easEnvUrl,
    buildEnvUrl,
    extraUrl,
    allProcessEnv: Object.keys(process.env).filter((key) =>
      key.includes("MALSAMI")
    ),
    allExpoConfigExtra: Constants.expoConfig?.extra
      ? Object.keys(Constants.expoConfig.extra)
      : [],
  });

  // 개발 환경에서 Alert으로도 확인 (선택사항)
  if (__DEV__) {
    // Alert.alert("환경변수 확인", `EAS: ${easEnvUrl}\nBuild: ${buildEnvUrl}\nExtra: ${extraUrl}`);
  }

  // 1. 최우선: EAS 런타임 환경변수
  if (easEnvUrl) {
    console.log("✅ EAS 런타임 환경변수 사용:", easEnvUrl);
    return easEnvUrl;
  }

  // 2. 빌드 시점 환경변수 (개발 환경)
  if (buildEnvUrl) {
    console.log("✅ 빌드 시점 환경변수 사용:", buildEnvUrl);
    return buildEnvUrl;
  }

  // 3. app.json의 extra 설정 (fallback)
  if (extraUrl) {
    console.log("✅ app.json extra에서 URL 사용:", extraUrl);
    return extraUrl;
  }

  // 4. 개발 환경 fallback
  if (__DEV__) {
    console.warn(
      "⚠️ 모든 환경변수가 설정되지 않았습니다. 로컬 서버를 사용합니다."
    );
    return "http://localhost:3000"; // 로컬 개발 서버
  }

  // 5. 프로덕션에서 모든 설정이 없을 때 에러
  throw new Error(
    "서버 URL이 설정되지 않았습니다. EAS 환경변수를 확인해주세요."
  );
};

const axiosInstance = axios.create({
  // baseURL: getServerBaseUrl(),
  baseURL: "https://api.sejong-malsami.co.kr",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// 원래 요청을 재시도하는 함수
const retryOriginalRequest = async (
  originalRequest: AxiosRequestConfig & { _retry?: boolean }
) => {
  try {
    return await new Promise((resolve, reject) => {
      failedRequestQueue.push({
        resolve: (token: string) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          resolve(axiosInstance(originalRequest));
        },
        reject: (err) => {
          reject(err);
        },
      });
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

axiosInstance.interceptors.request.use(
  (request) => {
    console.log("🚀 Axios Request:");
    console.log("- URL:", request.url);
    console.log("- BaseURL:", request.baseURL);
    console.log("- Method:", request.method);
    console.log("- Headers:", request.headers);
    return request;
  },
  (error) => {
    console.error("❌ Axios Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Axios Response Success:");
    console.log("- Status:", response.status);
    console.log("- URL:", response.config.url);
    return response;
  },
  async (error) => {
    console.error("❌ Axios Response Error:");
    console.error("- Status:", error.response?.status);
    console.error("- URL:", error.config?.url);
    console.error("- Message:", error.message);
    console.error("- Full Error:", error);

    const originalRequest = error.config;

    // 401 에러이면서 재시도된 요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // 이미 토큰 갱신 중이면 대기
      if (isRefreshing) {
        return retryOriginalRequest(originalRequest);
      }

      isRefreshing = true;

      try {
        // 리프레시 토큰으로 새 엑세스 토큰 요청
        const refreshToken = await getSecureStore(storageKeys.REFRESH_TOKEN);

        if (!refreshToken) {
          throw new Error("Refresh token not found");
        }

        const body = new FormData();
        body.append("refreshToken", String(refreshToken));

        const response = await axios.post(
          `${getServerBaseUrl()}/api/auth/mobile/refresh`,
          body,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // 새 토큰 저장
        await Promise.all([
          setSecureStore(storageKeys.ACCESS_TOKEN, String(accessToken)),
          setSecureStore(storageKeys.REFRESH_TOKEN, String(newRefreshToken)),
        ]);

        // 헤더에 새 토큰 설정
        setHeader("Authorization", `Bearer ${String(accessToken)}`);

        // 대기 중인 요청들 처리
        failedRequestQueue.forEach((request) => {
          request.resolve(accessToken);
        });

        failedRequestQueue = [];

        // 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신에 실패한 경우, 대기 중인 요청들에 에러 전달
        failedRequestQueue.forEach((request) => {
          request.reject(refreshError as AxiosError);
        });

        failedRequestQueue = [];

        // 로그인 페이지로 리다이렉트 로직 추가 가능
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    console.error("Axios Response Error:", error);
    console.error(error.response?.status);
    return Promise.reject(error);
  }
);

export { axiosInstance };
