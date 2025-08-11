// src/types/api/entities/mongo/noticeBoardLike.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";
import { ContentType } from "@/types/constants/contentType";

export interface NoticeBoardLike extends BaseMongoEntity {
  noticeBoardLikeId?: string;
  contentType?: ContentType;
  noticeBoardId?: string;
  memberId?: string;
}
