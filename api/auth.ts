import { axiosInstance } from "@/api";
import { storageKeys } from "@/constants";
import { AuthDto } from "@/types/responses/authDto";
import { MemberDto } from "@/types/responses/memberDto";
import { setHeader } from "@/utils";
import { getSecureStore } from "@/utils/secureStore";

async function postSignin(body: FormData): Promise<AuthDto> {
  console.log(body);
  const { data } = await axiosInstance.post("api/auth/mobile/signin", body);
  console.log(data);
  return data;
}

async function postGetUserInfo(): Promise<MemberDto> {
  const accessToken = await getSecureStore(storageKeys.ACCESS_TOKEN);
  console.log("accessToken", accessToken);

  setHeader("Authorization", `Bearer ${String(accessToken)}`);
  const body = new FormData();
  body.append("accessToken", String(accessToken));

  const { data } = await axiosInstance.post("/api/member/my-info", body);

  return data;
}

async function postRefreshToken(): Promise<AuthDto> {
  const refreshToken = await getSecureStore(storageKeys.REFRESH_TOKEN);
  const body = new FormData();
  body.append("refreshToken", String(refreshToken));
  const { data } = await axiosInstance.post("/api/auth/mobile/refresh", body);

  return data;
}

async function postFcmToken(body: FormData): Promise<AuthDto> {
  const { data } = await axiosInstance.post("/api/auth/fcm/token", body);

  return data;
}

export { postSignin, postGetUserInfo, postRefreshToken, postFcmToken };
