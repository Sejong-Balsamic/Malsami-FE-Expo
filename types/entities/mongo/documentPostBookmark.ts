// src/types/api/entities/mongo/documentPostBookmark.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";

export interface DocumentPostBookmark extends BaseMongoEntity {
  documentPostBookmarkId?: string;
  documentPostId?: string;
  memberId?: string;
}
