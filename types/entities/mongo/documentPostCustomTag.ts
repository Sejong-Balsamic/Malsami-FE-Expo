// src/types/api/entities/mongo/documentPostCustomTag.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";

export interface DocumentPostCustomTag extends BaseMongoEntity {
  documentPostCustomTagId?: string;
  documentPostId?: string;
  customTag?: string;
}
