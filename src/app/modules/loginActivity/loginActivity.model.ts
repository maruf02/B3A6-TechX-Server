import { model, Schema } from "mongoose";
import { TloginActivity } from "./loginActivity.interface";

const loginActivitySchema = new Schema<TloginActivity>({
  email: {
    type: String,
    required: true,
  },
  loginAt: {
    type: String,
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
});

export const loginActivityModel = model<TloginActivity>(
  "loginActivity",
  loginActivitySchema
);
