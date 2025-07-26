interface Member {
  createdDate: string;
  updatedDate: string;
  isEdited: boolean;
  isDeleted: boolean;
  memberId: string;
  studentId: number;
  studentName: string;
  uuidNickname: string;
  major: string;
  academicYear: string;
  enrollmentStatus: string;
  profileUrl: string;
  faculties: string[];
}

type MemberDto = {
  member: Member;
  accessToken: string;
  refreshToken: string;
  major: string;
};

export { Member };
export type { MemberDto };
