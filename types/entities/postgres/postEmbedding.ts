// src/types/api/entities/postEmbedding.ts
import { BaseEntity } from "@/types/entities/interface/baseEntity";
import { ContentType } from "@/types/constants/contentType";
import { FileStatus } from "@/types/constants/fileStatus";

export interface PostEmbedding extends BaseEntity {
  postEmbeddingId?: string;
  postId?: string;
  embedding?: number[];
  contentType?: ContentType;
  fileStatus?: FileStatus;
  message?: string;
}
