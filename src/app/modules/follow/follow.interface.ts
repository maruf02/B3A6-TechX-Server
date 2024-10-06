import { Types } from "mongoose";

export type TFollow = {
  userId: Types.ObjectId;
  followers: string[];
  following: string[];
};
