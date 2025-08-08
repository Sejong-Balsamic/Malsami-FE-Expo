// src/types/api/entities/postgres/mediaFile.ts
import { ContentType } from "@/types/constants/contentType";
import { BaseEntity } from "@/types/entities/interface/baseEntity";

export interface MediaFile extends BaseEntity {
  mediaFileId?: string;
  postId?: string;
  originalFileName?: string;
  uploadedFileName?: string;
  thumbnailUrl?: string;
  uploadedImageUrl?: string;
  filePath?: string;
  fileSize?: number;
  contentType?: ContentType;
  mimeType?: MimeType;
}
