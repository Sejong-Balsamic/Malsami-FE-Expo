import { postGetUser, postRefreshToken, postSignin, queryClient } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  setSecureStore,
  getSecureStore,
  removeSecureStore,
} from "@/utils/secureStore";
import { queryKeys, storageKeys } from "@/constants";
import { setHeader } from "@/utils";

function usePostSignin() {
  return useMutation({
    mutationFn: postSignin,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader("Authorization", accessToken);
      await setSecureStore(storageKeys.ACCESS_TOKEN, accessToken);
      await setSecureStore(storageKeys.REFRESH_TOKEN, refreshToken);
      queryClient.fetchQuery({
        queryKey: [queryKeys.AUTH],
      });
    },
  });
}

function useRefreshAuthToken() {
  return useMutation({
    mutationFn: postRefreshToken,
    onSuccess: async ({ accessToken, refreshToken }) => {
      setHeader("Authorization", accessToken);
      await setSecureStore(storageKeys.ACCESS_TOKEN, accessToken);
      await setSecureStore(storageKeys.REFRESH_TOKEN, refreshToken);
    },
  });
}

function useGetUser() {
  return useQuery({
    queryFn: postGetUser,
    queryKey: [queryKeys.AUTH, queryKeys.GET_USER],
  });
}

function useAuth() {}

export default useAuth;
