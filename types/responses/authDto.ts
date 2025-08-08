// src/types/api/responses/authDto.ts

import { FcmToken } from "@/types/entities/mongo/fcmToken";

export interface AuthDto {
  // 토큰 정보
  accessToken?: string;
  refreshToken?: string;
  isValidToken?: boolean;

  // 사용자 기본 정보
  studentName?: string;
  memberId?: string; // UUID
  fcmToken?: FcmToken;

  // 회원 상태 정보
  isFirstLogin?: boolean;
  isAdmin?: boolean;

  // 세종포털 인증 정보
  major?: string;
  studentIdString?: string;
  academicYear?: string;
  enrollmentStatus?: string;
}
