import { Types } from "mongoose";

export type TComment = {
  userId: string;
  userIdP: Types.ObjectId;
  name: string;
  postId: string;
  comment: string;
  isDeleted?: boolean;
};
