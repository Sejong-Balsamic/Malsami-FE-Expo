// src/types/api/entities/postgres/documentRequestPost.ts
import { DocumentType } from "@/types/constants/documentType";
import { BasePost } from "@/types/entities/interface/basePost";
import { Member } from "@/types/entities/postgres/member";

export interface DocumentRequestPost extends BasePost {
  documentRequestPostId?: string;
  member?: Member;
  title?: string;
  content?: string;
  subject?: string;
  faculties?: string[];
  documentTypes?: DocumentType[];
  isLiked?: boolean;
}
