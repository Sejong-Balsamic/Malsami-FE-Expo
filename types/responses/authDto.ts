// src/types/api/responses/authDto.ts

import { FcmToken } from "@/types/entities/mongo/fcmToken";

export interface AuthDto {
  accessToken?: string;
  refreshToken?: string;
  isValidToken?: boolean;
  studentName?: string;
  memberId?: string; // UUID
  fcmToken?: FcmToken;
  major?: string;
  studentIdString?: string;
  academicYear?: string;
  enrollmentStatus?: string;
}
