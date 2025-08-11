// src/types/api/requests/generalPostCommand.ts
import { ContentType } from "@/types/constants/contentType";
import { SortType } from "@/types/constants/sortType";

export interface GeneralPostCommand {
  memberId?: string;
  contentType?: ContentType;
  sortType?: SortType;
  pageNumber?: number;
  pageSize?: number;
  query?: string;
}
