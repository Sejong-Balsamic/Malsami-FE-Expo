// src/types/api/requests/yeopjeonCommand.ts
import { Member } from "@/types/entities/postgres/member";

export interface YeopjeonCommand {
  member?: Member;
  amount?: number;
  targetMemberId?: string;
}
