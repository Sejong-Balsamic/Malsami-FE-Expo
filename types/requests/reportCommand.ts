// src/types/api/requests/reportCommand.ts
import { Member } from "@/types/entities/postgres/member";
import { ContentType } from "@/types/constants/contentType";
import { ReportReason } from "@/types/constants/reportReason";

export interface ReportCommand {
  member?: Member;
  reportedEntityId?: string;
  contentType?: ContentType;
  reportReason?: ReportReason;
  pageNumber?: number;
  pageSize?: number;
}
