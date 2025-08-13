import { NoticePostDto } from "@/types/responses/noticePostDto";
import { axiosInstance } from "./axios";

async function getNoticePosts(): Promise<NoticePostDto> {
  const body = new FormData();
  body.append("page", "1");
  const { data } = await axiosInstance.post("/api/notice/get/pinned", body);
  return data;
}

export { getNoticePosts };
