// src/types/api/responses/queryDto.ts
import { Page } from "@/types/entities/interface/page";
import { QuestionPost } from "@/types/entities/postgres/questionPost";
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { DocumentRequestPost } from "@/types/entities/postgres/documentRequestPost";
import { NoticePost } from "@/types/entities/postgres/noticePost";
import { SearchHistory } from "@/types/entities/mongo/searchHistory";

export interface QueryDto {
  questionPostsPage?: Page<QuestionPost>;
  documentPostsPage?: Page<DocumentPost>;
  documentRequestPostsPage?: Page<DocumentRequestPost>;
  noticePostsPage?: Page<NoticePost>;
  searchHistoryList?: SearchHistory[];
}
