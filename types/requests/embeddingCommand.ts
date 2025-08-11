// src/types/api/requests/embeddingCommand.ts
import { ContentType } from "@/types/constants/contentType";

export interface EmbeddingCommand {
  text?: string;
  threshold?: number;
  contentType?: ContentType;
  pageSize?: number;
  pageNumber?: number;
}
