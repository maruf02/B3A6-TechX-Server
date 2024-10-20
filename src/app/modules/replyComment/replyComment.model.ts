import { Schema, model } from "mongoose";
import { TReplyComment } from "./replyComment.interface";

export const replyCommentSchema = new Schema<TReplyComment>(
  {
    userId: {
      type: String,
      required: true,
    },
    userIdP: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    repliesComment: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      required: true,
    },
    commentIdP: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure replies that are not deleted are fetched
replyCommentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const ReplyCommentModel = model<TReplyComment>(
  "ReplyComment",
  replyCommentSchema
);
