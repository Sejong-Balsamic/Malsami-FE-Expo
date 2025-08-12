// src/types/api/responses/embeddingDto.ts
import { Page } from "@/types/entities/interface/page";
import { PostEmbedding } from "@/types/entities/postgres/postEmbedding";

export interface EmbeddingDto {
  postEmbeddingsPage?: Page<PostEmbedding>;
  generalPostsPage?: Page<any>;
}
