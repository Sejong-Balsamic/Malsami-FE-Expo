// src/types/api/requests/queryCommand.ts
import { SortType } from "@/types/constants/sortType";

export interface QueryCommand {
  query?: string;
  subject?: string;
  sortType?: SortType;
  pageNumber?: number;
  pageSize?: number;
  topN?: number;
}
