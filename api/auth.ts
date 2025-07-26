import { axiosInstance } from "@/api";
import { MemberDto } from "@/types/domain";

async function postSignin(body: FormData): Promise<MemberDto> {
  const { data } = await axiosInstance.post("api/member/signin", body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}

export { postSignin };
