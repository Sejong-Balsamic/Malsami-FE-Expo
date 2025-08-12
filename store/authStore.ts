import { MemberDto } from "@/types/responses/memberDto";
import { create } from "zustand";

type AuthStore = {
  member: MemberDto;
};
