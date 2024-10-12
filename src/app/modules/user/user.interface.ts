import { Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  profileImage?: string;
  coverImage?: string;
  role?: "user" | "admin";
  isBlock?: "Yes" | "No";
  isDeleted?: boolean;
  password: string;
  phone: string;
  address: string;
  follower?: string[];
  following?: string[];
  followerP?: Types.ObjectId[];
  followingP?: Types.ObjectId[];
};

export type TUserRole = keyof typeof USER_ROLE;
