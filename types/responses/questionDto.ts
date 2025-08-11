// src/types/api/responses/questionDto.ts

import { QuestionPost } from "@/types/entities/postgres/questionPost";
import { Page } from "@/types/entities/interface/page";
import { AnswerPost } from "@/types/entities/postgres/answerPost";
import { MediaFile } from "@/types/entities/postgres/mediaFile";
import { QuestionBoardLike } from "@/types/entities/mongo/questionBoardLike";

export interface QuestionDto {
  questionPost?: QuestionPost;
  questionPostsPage?: Page<QuestionPost>;
  answerPost?: AnswerPost;
  answerPosts?: AnswerPost[];
  mediaFiles?: MediaFile[];
  customTags?: string[];
  questionBoardLike?: QuestionBoardLike;
}
