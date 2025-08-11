// src/types/api/entities/interface/basePost.ts
import { BaseEntity } from "@/types/entities/interface/baseEntity";

export interface BasePost extends BaseEntity {
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
  isPrivate?: boolean;
}
