import mongoose, { Schema, model } from "mongoose";
import { TPost } from "./post.interface";

const postSchema = new Schema<TPost>(
  {
    userIdP: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Web", "Software", "Engineering", "AI"],
      required: true,
    },
    type: {
      type: String,
      enum: ["Free", "Premium"],
      default: "Free",
    },
    images: {
      type: String,
      required: true,
    },
    likes: {
      type: [String],
      default: [], // Array of user IDs
    },
    dislikes: {
      type: [String],
      default: [], // Array of user IDs
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

postSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const PostModel = model<TPost>("Post", postSchema);
