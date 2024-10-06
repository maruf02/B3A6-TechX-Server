import { Types } from "mongoose";

export type TPost = {
  userId: string;
  userIdP: Types.ObjectId;
  name: string;
  post: string;
  category: "Web" | "Software" | "Engineering" | "AI";
  type?: "Free" | "Premium";
  images: string;
  likes: string[];
  dislikes: string[];
  isDeleted?: boolean;
};
