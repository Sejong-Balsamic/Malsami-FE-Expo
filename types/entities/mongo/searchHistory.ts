import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";

export interface SearchHistory extends BaseMongoEntity {
  searchHistoryId?: string;
  keyword?: string;
  searchCount?: number;
  lastRank?: number;
  currentRank?: number;
  rankChange?: number;
  isNew?: boolean;
}
