// src/types/api/entities/postgrs/documentPost.ts
import { PostTier } from "@/types/constants/postTier";
import { BasePost } from "@/types/entities/interface/basePost";
import { Member } from "@/types/entities/postgres/member";
import { DocumentType } from "@/types/constants/documentType";

export interface DocumentPost extends BasePost {
  documentPostId?: string;
  member?: Member;
  title?: string;
  customTags?: string[];
  subject?: string;
  content?: string;
  faculties?: string[];
  documentTypes?: DocumentType[];
  postTier?: PostTier;
  thumbnailUrl?: string;
  attendedYear?: number;
  dislikeCount?: number;
  isDepartmentPrivate?: boolean;
  isPopular?: boolean;
  dailyScore?: number;
  weeklyScore?: number;
  isLiked?: boolean;
}
