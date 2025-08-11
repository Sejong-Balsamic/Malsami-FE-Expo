// src/types/api/responses/documentDto.ts
import { DocumentPost } from "@/types/entities/postgres/documentPost";
import { Page } from "@/types/entities/interface/page";
import { DocumentRequestPost } from "@/types/entities/postgres/documentRequestPost";
import { DocumentBoardLike } from "@/types/entities/mongo/documentBoardLike";
import { DocumentFile } from "@/types/entities/postgres/documentFile";

export interface DocumentDto {
  documentPost?: DocumentPost;
  documentPostsPage?: Page<DocumentPost>;
  documentRequestPost?: DocumentRequestPost;
  documentRequestPostsPage?: Page<DocumentRequestPost>;
  documentBoardLike?: DocumentBoardLike;
  customTags?: string[];
  documentFiles?: DocumentFile[];
  fileBytes?: Uint8Array;
  fileName?: string;
  mimeType?: string;
}
