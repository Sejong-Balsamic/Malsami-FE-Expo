import { axiosInstance } from "@/api";
import { storageKeys } from "@/constants";
import { AuthDto } from "@/types/responses/authDto";
import { getSecureStore } from "@/utils/secureStore";

async function postSignin(body: FormData): Promise<AuthDto> {
  const { data } = await axiosInstance.post("api/auth/mobile/signin", body);

  return data;
}

async function postGetUserInfo() {
  const { data } = await axiosInstance.post("/api/member/my-info");

  return data;
}

async function postRefreshToken(): Promise<AuthDto> {
  const refreshToken = await getSecureStore(storageKeys.REFRESH_TOKEN);
  const body = new FormData();
  body.append("refreshToken", String(refreshToken));
  const { data } = await axiosInstance.post("/api/auth/mobile/refresh", body);

  return data;
}

async function postFcmToken(body: FormData) {
  const { data } = await axiosInstance.post("/api/auth/fcm/token", body);

  return data;
}

export { postSignin, postGetUserInfo, postRefreshToken, postFcmToken };
