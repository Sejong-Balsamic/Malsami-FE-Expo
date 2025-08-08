// src/types/api/response/noticePostDto.ts
import { NoticePost } from "@/types/entities/postgres/noticePost";
import { Page } from "@/types/entities/interface/page";

export interface NoticePostDto {
  noticePost?: NoticePost;
  noticePostsPage?: Page<NoticePost>;
}
