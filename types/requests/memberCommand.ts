// src/types/api/requests/memberCommand.ts
import { Member } from "@/types/entities/postgres/member";
import { ContentType } from "@/types/constants/contentType";
import { SortType } from "@/types/constants/sortType";
import { AccountStatus } from "@/types/constants/accountStatus";
import { Role } from "@/types/constants/role";

export interface MemberCommand {
  memberId?: string;
  memberIdStr?: string;
  studentId?: number;
  studentIdString?: string;
  studentName?: string;
  uuidNickname?: string;
  major?: string;
  academicYear?: string;
  enrollmentStatus?: string;
  faculty?: string;
  member?: Member;
  sejongPortalId?: string;
  sejongPortalPassword?: string;
  pageNumber?: number;
  pageSize?: number;
  contentType?: ContentType;
  sortType?: SortType;
  sortField?: string;
  sortDirection?: string;
  searchTerm?: string;
  accountStatus?: AccountStatus;
  role?: Role;
  lastLoginStart?: string;
  lastLoginEnd?: string;
  isFirstLogin?: boolean;
  isEdited?: boolean;
  isDeleted?: boolean;
}
