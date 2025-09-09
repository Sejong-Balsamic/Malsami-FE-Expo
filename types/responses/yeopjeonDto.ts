// src/types/api/responses/yeopjeonDto.ts
import { Yeopjeon } from "@/types/entities/postgres/yeopjeon";

export interface YeopjeonDto {
  yeopjeon?: Yeopjeon;
  transactionId?: string;
  transactionDate?: string;
}
