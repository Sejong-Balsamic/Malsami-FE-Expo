import { NoticePostDto } from "@/types/responses/noticePostDto";
import { axiosInstance } from "./axios";

async function getNotice(): Promise<NoticePostDto> {
  const body = new FormData();
  body.append("page", "1");
  const { data } = await axiosInstance.post("/api/notice/filter", body);
  return data;
}

export { getNotice };
