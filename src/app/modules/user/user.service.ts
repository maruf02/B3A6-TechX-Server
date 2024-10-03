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
  const users = await UserModel.find().select("-password");
  return users;
};

const getUserByEmailFromDB = async (email: string) => {
  const user = await UserModel.findOne({ email }).select("-password");
  return user;
};

const updatePasswordByEmail = async (email: string, password: string) => {
  if (!password) {
    throw new Error("New password is required");
  }

  // Hash the new password
  const saltRounds = Number(config.bcrypt_salt_rounds);
  if (isNaN(saltRounds) || saltRounds <= 0) {
    throw new Error("Invalid salt rounds configuration");
  }
  console.log("object", email, password);
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Find the user by email and update the password
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
  const user = await UserModel.findById(id).select("-password");
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

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByEmailFromDB,
  updatePasswordByEmail,
  getUserByIdFromDB,
  updateUserByIdInDB,
  softDeleteUserByIdFromDB,
};
