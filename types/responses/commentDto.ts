//  src/types/api/responses/commentDto.ts
import { Page } from "@/types/entities/interface/page";
import { CommentLike } from "@/types/entities/mongo/commentLike";
import { Comment } from "@/types/entities/postgres/comment";

export interface CommentDto {
  comment?: Comment;
  commentsPage?: Page<Comment>;
  commentLike?: CommentLike;
}
