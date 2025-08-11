import {
  postGetUserInfo,
  postRefreshToken,
  postSignin,
  queryClient,
  axiosInstance,
} from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSecureStore, setSecureStore } from "@/utils/secureStore";
import { queryKeys, storageKeys } from "@/constants";
import { setHeader } from "@/utils";
import { router } from "expo-router";
import { AuthDto } from "@/types/responses/authDto";
import { MemberDto } from "@/types/responses/memberDto";
import { useCallback } from "react";

function usePostSignin() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: async (data: AuthDto) => {
      // 토큰 설정
      setHeader("Authorization", `Bearer ${String(data.accessToken)}`);
      await setSecureStore(storageKeys.ACCESS_TOKEN, String(data.accessToken));
      await setSecureStore(
        storageKeys.REFRESH_TOKEN,
        String(data.refreshToken)
      );
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
      });
      await queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
      });

      router.replace("/");
    },
  });
}

function useRefreshAuthToken() {
  return useMutation({
    mutationFn: postRefreshToken,
    onSuccess: async (data: AuthDto) => {
      // 토큰 설정
      setHeader("Authorization", `Bearer ${String(data.accessToken)}`);
      await setSecureStore(storageKeys.ACCESS_TOKEN, String(data.accessToken));
      await setSecureStore(
        storageKeys.REFRESH_TOKEN,
        String(data.refreshToken)
      );
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
      });
    },
  });
}

function useGetUserInfo() {
  return useQuery<MemberDto>({
    queryFn: postGetUserInfo,
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    refetchOnWindowFocus: true,
    // retry: (failureCount, error: any) => {
    //   if (error?.response?.status === 401) {
    //     return false;
    //   }
    //   return failureCount < 2;
    // },
  });
}

/**
 * 토큰 갱신 및 API 재요청을 처리하는 훅
 */
function useTokenRefresh() {
  const queryClient = useQueryClient();

  /**
   * 토큰을 갱신하고 캐시를 업데이트하는 함수
   */
  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = await getSecureStore(storageKeys.REFRESH_TOKEN);

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const body = new FormData();
      body.append("refreshToken", String(refreshToken));

      const { data } = await axiosInstance.post(
        "/api/auth/mobile/refresh",
        body
      );

      // 새 토큰 저장
      await setSecureStore(storageKeys.ACCESS_TOKEN, String(data.accessToken));
      await setSecureStore(
        storageKeys.REFRESH_TOKEN,
        String(data.refreshToken)
      );

      // 헤더 업데이트
      setHeader("Authorization", `Bearer ${String(data.accessToken)}`);

      // 유저 정보 쿼리 무효화
      await queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
      });

      return data;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // 로그인 페이지로 리다이렉트 등의 추가 처리 가능
      router.replace("/auth");
      throw error;
    }
  }, [queryClient]);

  /**
   * API 요청을 수행하고 필요시 토큰을 갱신하고 재시도하는 함수
   * @param apiCall API 호출 함수
   */
  const executeWithTokenRefresh = useCallback(
    async <T>(apiCall: () => Promise<T>): Promise<T> => {
      try {
        return await apiCall();
      } catch (error: any) {
        // 401 에러인 경우 토큰 갱신 후 재시도
        if (error?.response?.status === 401) {
          try {
            await refreshToken();
            return await apiCall();
          } catch (refreshError) {
            throw refreshError;
          }
        }
        throw error;
      }
    },
    [refreshToken]
  );

  return {
    refreshToken,
    executeWithTokenRefresh,
  };
}

function useAuth() {
  const { data, isLoading, error } = useGetUserInfo();
  const signinMutation = usePostSignin();
  const refreshTokenMutation = useRefreshAuthToken();
  const { refreshToken, executeWithTokenRefresh } = useTokenRefresh();

  return {
    auth: {
      // 사용자 기본 정보
      memberId: data?.member?.memberId || "",
      studentName: data?.member?.studentName || "",
      studentId: data?.member?.studentId || "",

      // 세종포털 인증 정보
      major: data?.major || "",
      studentIdString: data?.studentIdString || "",
      academicYear: data?.academicYear || "",
      enrollmentStatus: data?.enrollmentStatus || "",

      // 회원 상태 정보
      isFirstLogin: data?.isFirstLogin || false,
      isAdmin: data?.isAdmin || false,
    },
    isLoading,
    error,
    signinMutation,
    refreshTokenMutation,
    refreshToken,
    executeWithTokenRefresh,
  };
}

export default useAuth;
