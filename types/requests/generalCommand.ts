// src/types/api/requests/generalCommand.ts

import { ContentType } from "@/types/constants/contentType";
import { SortType } from "@/types/constants/sortType";

export interface GeneralCommand {
  memberId?: string;
  contentType?: ContentType;
  query?: string;
  sortType?: SortType;
  pageNumber?: number;
  pageSize?: number;
}
