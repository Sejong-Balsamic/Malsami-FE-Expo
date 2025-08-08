// src/types/api/entities/mongo/yeopjeonHistory.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";
import { YeopjeonAction } from "@/types/constants/yeopjeonAction";

export interface YeopjeonHistory extends BaseMongoEntity {
  yeopjeonHistoryId?: string;
  memberId?: string;
  yeopjeonChange?: number;
  yeopjeonAction?: YeopjeonAction;
  resultYeopjeon?: number;
  content?: string;
}
