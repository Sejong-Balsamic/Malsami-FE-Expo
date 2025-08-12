// src/types/api/entities/postgres/comment.ts
import { BaseEntity } from "@/types/entities/interface/baseEntity";
import { ContentType } from "@/types/constants/contentType";
import { Member } from "@/types/entities/postgres/member";

export interface Comment extends BaseEntity {
  commentId: string;
  member: Member;
  postId: string;
  content: string;
  likeCount: number;
  contentType: ContentType;
  isPrivate: boolean;
  isLiked: boolean;
}
