// src/types/api/entities/noticePost.ts
import { BasePost } from "@/types/entities/interface/basePost";
import { Member } from "@/types/entities/postgres/member";

export interface NoticePost extends BasePost {
  noticePostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  isHidden?: boolean;
  isLiked?: boolean;
}
