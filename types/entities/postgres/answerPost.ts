// src/types/api/entities/postgres/answerPost.ts

import { BasePost } from "@/types/entities/interface/basePost";
import { Member } from "@/types/entities/postgres/member";
import { QuestionPost } from "@/types/entities/postgres/questionPost";
import { MediaFile } from "@/types/entities/postgres/mediaFile";

export interface AnswerPost extends BasePost {
  answerPostId?: string;
  member?: Member;
  questionPost?: QuestionPost;
  content?: string;
  isChaetaek?: boolean;
  mediaFiles?: MediaFile[];
  isLiked?: boolean;
}
