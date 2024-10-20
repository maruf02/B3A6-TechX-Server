import { Types } from "mongoose";

export type TReplyComment = {
  userId: string;
  userIdP: Types.ObjectId;
  name: string;
  postId: string;
  commentId: string;
  commentIdP: Types.ObjectId;
  repliesComment: string;
  isDeleted?: boolean;
};
