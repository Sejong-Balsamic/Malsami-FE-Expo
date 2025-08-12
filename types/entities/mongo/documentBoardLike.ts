// src/types/api/entities/mongo/documentBoardLike.ts
import { BaseMongoEntity } from "@/types/entities/interface/baseMongoEntity";
import { ContentType } from "@/types/constants/contentType";
import { LikeType } from "@/types/constants/likeType";

export interface DocumentBoardLike extends BaseMongoEntity {
  documentBoardLikeId?: string;
  memberId?: string;
  documentBoardId?: string;
  contentType?: ContentType;
  likeType?: LikeType;
}
