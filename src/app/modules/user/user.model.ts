import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";
import { number } from "zod";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user", // Auto-set default value
    },
    isBlock: {
      type: String,
      enum: ["Yes", "No"],
      default: "No", // Auto-set default value
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select: 0,
      // select: false,
    },
    phone: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const UserModel = model<TUser>("User", userSchema);
