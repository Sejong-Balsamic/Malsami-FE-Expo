// src/types/api/entities/postgres/exp.ts
import { ExpTier } from "@/types/constants/expTier";
import { Member } from "@/types/entities/postgres/member";

export interface Exp {
  expId?: string;
  member?: Member;
  exp?: number;
  expTier?: ExpTier;
  tierStartExp?: number;
  tierEndExp?: number;
  progressPercent?: number;
}
