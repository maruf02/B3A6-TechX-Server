import { Types } from "mongoose";
import config from "../../config";
import { TUser } from "./user.interface";
import { UserModel } from "./user.model";
import bcrypt from "bcrypt";

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  // const populateUser = await result.populate("user", "-password");
  // return populateUser;
  const userWithoutPassword = await UserModel.findById(result._id).select(
    "-password"
  );
  return userWithoutPassword;
  // return result;
};

const getAllUsersFromDB = async () => {
  const users = await UserModel.find()
    .select("-password")
    .populate("followerP")
    .populate("followingP");
  return users;
};

const getUserByEmailFromDB = async (email: string) => {
  const user = await UserModel.findOne({ email })
    .select("-password")
    .populate("followerP")
    .populate("followingP");
  return user;
};

const updatePasswordByEmail = async (email: string, password: string) => {
  if (!password) {
    throw new Error("New password is required");
  }

  const saltRounds = Number(config.bcrypt_salt_rounds);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error("Invalid salt rounds configuration");
  }
  console.log("object", email, password);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await UserModel.findOneAndUpdate(
    { email },
    { password: hashedPassword },
    { new: true }
  );

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
const getUserByIdFromDB = async (id: string) => {
  const user = await UserModel.findById(id)
    .select("-password")
    .populate("followerP")
    .populate("followingP");
  return user;
};

const updateUserByIdInDB = async (id: string, user: TUser) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, user, {
    new: true,
  }).select("-password");
  return updatedUser;
};

const softDeleteUserByIdFromDB = async (id: string) => {
  const deletedUser = await UserModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  ).select("-password");
  return deletedUser;
};

// const followUserInDB = async (followerId: string, userId: string) => {
//   const userToFollow = await UserModel.findById(userId);
//   if (!userToFollow) throw new Error("User not found");

//   const follower = await UserModel.findById(followerId);
//   if (!follower) throw new Error("Follower not found");

//   if (!userToFollow.follower) userToFollow.follower = [];
//   if (!userToFollow.followerP) userToFollow.followerP = [];
//   if (!follower.following) follower.following = [];
//   if (!follower.followingP) follower.followingP = [];

//   const followerObjectId = new Types.ObjectId(followerId);
//   const userObjectId = new Types.ObjectId(userId);

//   if (userToFollow.follower.includes(followerId)) {
//     userToFollow.follower = userToFollow.follower.filter(
//       (id) => id !== followerId
//     );
//     userToFollow.followerP = userToFollow.followerP.filter(
//       (id) => !id.equals(followerObjectId)
//     );
//     follower.following = follower.following.filter((id) => id !== userId);
//     follower.followingP = follower.followingP.filter(
//       (id) => !id.equals(userObjectId)
//     );
//   } else {
//     userToFollow.follower.push(followerId);
//     userToFollow.followerP.push(followerObjectId);
//     follower.following.push(userId);
//     follower.followingP.push(userObjectId);
//   }

//   await userToFollow.save();
//   await follower.save();
//   return userToFollow;
// };

const followUserInDB = async (followerId: string, userId: string) => {
  const userToFollow = await UserModel.findById(userId);
  if (!userToFollow) throw new Error("User not found");

  const follower = await UserModel.findById(followerId);
  if (!follower) throw new Error("Follower not found");

  // Ensure the arrays exist or initialize them if not
  userToFollow.follower = userToFollow.follower || [];
  userToFollow.followerP = userToFollow.followerP || [];

  follower.following = follower.following || [];
  follower.followingP = follower.followingP || [];

  const followerObjectId = new Types.ObjectId(followerId);
  const userObjectId = new Types.ObjectId(userId);

  // Check if the follower already exists
  if (userToFollow.follower.includes(followerId)) {
    // Unfollow the user: remove from both follower/following and followerP/followingP arrays
    userToFollow.follower = userToFollow.follower.filter(
      (id) => id !== followerId
    );
    userToFollow.followerP = userToFollow.followerP.filter(
      (id) => !id.equals(followerObjectId)
    );

    follower.following = follower.following.filter((id) => id !== userId);
    follower.followingP = follower.followingP.filter(
      (id) => !id.equals(userObjectId)
    );
  } else {
    // Follow the user: add to both follower/following and followerP/followingP arrays
    userToFollow.follower.push(followerId);
    userToFollow.followerP.push(followerObjectId);

    follower.following.push(userId);
    follower.followingP.push(userObjectId);
  }

  // Save the updated documents
  await userToFollow.save();
  await follower.save();

  return userToFollow;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByEmailFromDB,
  updatePasswordByEmail,
  getUserByIdFromDB,
  updateUserByIdInDB,
  softDeleteUserByIdFromDB,
  followUserInDB,
};
