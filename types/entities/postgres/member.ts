// src/types/api/entities/postgres/member.ts

import { Role } from "@/types/constants/role";
import { AccountStatus } from "@/types/constants/accountStatus";
import { BaseEntity } from "@/types/entities/interface/baseEntity";

export interface Member extends BaseEntity {
  memberId?: string;
  studentId?: number;
  studentName?: string;
  uuidNickname?: string;
  major?: string;
  academicYear?: string;
  enrollmentStatus?: string;
  profileUrl?: string;
  faculties?: string[];
  isNotificationEnabled?: boolean;
  roles?: Role[];
  accountStatus?: AccountStatus;
  lastLoginTime?: string;
  isFirstLogin?: boolean;
}
