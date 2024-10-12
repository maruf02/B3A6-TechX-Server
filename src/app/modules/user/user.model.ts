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
      default: "user",
    },
    isBlock: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
    profileImage: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
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
    follower: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },

    followerP: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    followingP: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   const user = this;
//   user.password = await bcrypt.hash(
//     user.password,
//     Number(config.bcrypt_salt_rounds)
//   );
//   next();
// });
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      return next(error as Error);
    }
  } else {
    return next();
  }
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
