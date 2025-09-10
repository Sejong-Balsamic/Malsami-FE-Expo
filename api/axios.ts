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

// 서버 URL 가져오기 (개발/배포 환경 모두 지원)
const getServerBaseUrl = () => {
  // 1. 개발 환경: .env 파일에서 읽기
  if (__DEV__ && process.env.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL) {
    return process.env.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL;
  }

  // 2. 배포 환경: EAS Secret에서 주입된 환경변수
  if (process.env.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL) {
    return process.env.EXPO_PUBLIC_MALSAMI_SERVER_BASEURL;
  }

  // 3. app.json의 extra에서 fallback (필요시)
  if (Constants.expoConfig?.extra?.serverBaseUrl) {
    return Constants.expoConfig.extra.serverBaseUrl;
  }

  // 4. 최종 fallback (개발 환경)
  if (__DEV__) {
    console.warn(
      "⚠️ EXPO_PUBLIC_MALSAMI_SERVER_BASEURL이 설정되지 않았습니다. .env 파일을 확인해주세요."
    );
    return "http://localhost:3000"; // 로컬 개발 서버
  }

  throw new Error("서버 URL이 설정되지 않았습니다. 환경변수를 확인해주세요.");
};

const axiosInstance = axios.create({
  baseURL: getServerBaseUrl(),
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
    console.log("Axios Request:", request);
    return request;
  },
  (error) => {
    console.error("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", response);
    return response;
  },
  async (error) => {
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
