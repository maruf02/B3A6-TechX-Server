import { Schema, model } from "mongoose";
import { TComment } from "./comment.interface";

export const commentSchema = new Schema<TComment>(
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
    postId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
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

commentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const CommentModel = model<TComment>("Comment", commentSchema);
