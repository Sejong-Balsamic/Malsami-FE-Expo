// src/types/api/requests/notificationCommand.ts
import { Member } from "@/types/entities/postgres/member";
import { NotificationCategory } from "@/types/constants/notificationCategory";

export interface NotificationCommand {
  member?: Member;
  memberId?: string;
  fcmToken?: string;
  notificationCategory?: NotificationCategory;
  title?: string;
  body?: string;
  templeteValueMap?: Record<string, string>;
}
