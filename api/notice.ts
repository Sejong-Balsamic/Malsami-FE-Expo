import { NoticePostDto } from "@/types/responses/noticePostDto";
import { axiosInstance } from "./axios";

async function getNoticeFilter(): Promise<NoticePostDto> {
  const body = new FormData();
  body.append("dummy", "value");
  const { data } = await axiosInstance.post("/api/notice/filter", body);
  return data;
}

export { getNoticeFilter };
