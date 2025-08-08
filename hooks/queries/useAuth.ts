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

function usePostSignin() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: async (data: AuthDto) => {
      setHeader("Authorization", String(data.accessToken));
      await setSecureStore(storageKeys.ACCESS_TOKEN, String(data.accessToken));
      await setSecureStore(
        storageKeys.REFRESH_TOKEN,
        String(data.refreshToken)
      );
      queryClient.fetchQuery({
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
      setHeader("Authorization", String(data.accessToken));
      await setSecureStore(storageKeys.ACCESS_TOKEN, String(data.accessToken));
      await setSecureStore(
        storageKeys.REFRESH_TOKEN,
        String(data.refreshToken)
      );
    },
  });
}

function useGetUserInfo() {
  return useQuery({
    queryFn: postGetUserInfo,
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
  });
}

function useAuth() {
  const { data } = useGetUserInfo();
  const signinMutation = usePostSignin();
  const refreshTokenMutation = useRefreshAuthToken();

  return {
    auth: {
      id: data?.id,
      nickname: data?.nickname,
    },
    signinMutation,
    refreshTokenMutation,
  };
}

export default useAuth;
