// src/types/api/requests/noticePostCommand.ts
import { Member } from "@/types/entities/postgres/member";
import { SortType } from "@/types/constants/sortType";

export interface NoticePostCommand {
  member?: Member;
  title?: string;
  content?: string;
  query?: string;
  sortType?: SortType;
  sortField?: string;
  sortDirection?: string;
  pageNumber?: number;
  pageSize?: number;
}
