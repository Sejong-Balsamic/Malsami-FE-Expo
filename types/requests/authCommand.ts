// src/types/api/requests/authCommand.ts

import { Member } from "@/types/entities/postgres/member";

export interface AuthCommand {
  refreshToken?: string;
  accessToken?: string;
  memberId?: string;
  member?: Member;
  fcmToken?: string;
  sejongPortalId?: string;
  sejongPortalPassword?: string;
}
