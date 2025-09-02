import { NoticePostDto } from "@/types/responses/noticePostDto";
import { axiosInstance } from "./axios";
import { NoticePostCommand } from "@/types/requests/noticePostCommand";
import { NoticePost } from "@/types/entities/postgres/noticePost";

async function getNoticePosts(): Promise<NoticePostDto> {
  const body = new FormData();
  body.append("page", "1");
  const { data } = await axiosInstance.post("/api/notice/get/pinned", body);

  return data;
}

async function getFilteredNoticePosts(filterText: string): Promise<NoticePost> {
  const formData = new FormData();
  formData.append("query", filterText);
  const { data } = await axiosInstance.post("/api/notice/filter", formData);

  return data;
}

export { getNoticePosts, getFilteredNoticePosts };
