import {
  postGetUserInfo,
  postRefreshToken,
  postSignin,
  queryClient,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { setSecureStore } from "@/utils/secureStore";
import { queryKeys, storageKeys } from "@/constants";
import { setHeader } from "@/utils";
import { router } from "expo-router";
import { AuthDto } from "@/types/responses/authDto";
import { MemberDto } from "@/types/responses/memberDto";

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

function useAuth() {
  const { data, isLoading, error } = useGetUserInfo();
  const signinMutation = usePostSignin();
  const refreshTokenMutation = useRefreshAuthToken();

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
  };
}

export default useAuth;
