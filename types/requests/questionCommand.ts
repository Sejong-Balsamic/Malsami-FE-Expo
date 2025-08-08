// src/types/api/requests/questionCommand.ts
import { QuestionPresetTag } from "@/types/constants/questionPresetTag";
import { ContentType } from "@/types/constants/contentType";
import { SortType } from "@/types/constants/sortType";
import { ChaetaekStatus } from "@/types/constants/chaetaekStatus";

export interface QuestionCommand {
  postId?: string;
  memberId?: string;
  title?: string;
  questionPostId?: string;
  content?: string;
  subject?: string;
  attachmentFiles?: File[];
  questionPresetTags?: QuestionPresetTag[];
  customTags?: string[];
  rewardYeopjeon?: number;
  contentType?: ContentType;
  isPrivate?: boolean;
  pageNumber?: number;
  pageSize?: number;
  faculty?: string;
  query?: string;
  sortType?: SortType;
  chaetaekStatus?: ChaetaekStatus;
}
