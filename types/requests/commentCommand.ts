// src/types/api/requests/commentCommand.ts

import { ContentType } from "@/types/constants/contentType";

export interface CommentCommand {
  memberId?: string;
  postId?: string;
  content?: string;
  contentType?: ContentType;
  isPrivate?: boolean;
  pageNumber?: number;
  pageSize?: number;
}
