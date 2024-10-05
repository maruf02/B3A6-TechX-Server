import { Request, Response } from "express";
import { userValidationSchema } from "./user.validation";
import { userServices } from "./user.service";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  // const user = req.body;
  // const result = await userServices.createUserIntoDB(user);
  // const populateUser = await result.populate("user", "-password");
  const user = req.body;
  console.log(user);
  const zodParseDataUser = userValidationSchema.parse(user);
  const result = await userServices.createUserIntoDB(zodParseDataUser);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await userServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

const getUserByEmail = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const user = await userServices.getUserByEmailFromDB(email);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

const updatePassword = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const { password } = req.body;

  const updatedUser = await userServices.updatePasswordByEmail(email, password);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Password updated successfully",
    data: updatedUser,
  });
});
const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
  const user = await userServices.getUserByIdFromDB(id);
  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }
  if (user.isDeleted) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "This user has been deleted",
    });
  }
  if (user.isBlock === "Yes") {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "This user has been block",
    });
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.body;

  // const zodParseDataUser = userValidationSchema.parse(user);
  const updatedUser = await userServices.updateUserByIdInDB(id, user);

  if (!updatedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User updated successfully",
    data: updatedUser,
  });
});

const softDeleteUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const deletedUser = await userServices.softDeleteUserByIdFromDB(id);

  if (!deletedUser) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "User not found",
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User deleted successfully",
    data: deletedUser,
  });
});

const followUser = async (req: Request, res: Response) => {
  const { followerId } = req.body; // This is myId (the current user)
  const { id: userId } = req.params; // This is userId (the user being followed)

  const updatedUser = await userServices.followUserInDB(followerId, userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Follow/Unfollow successful",
    data: updatedUser,
  });
};

export const userController = {
  createUser,
  getAllUsers,
  getUserByEmail,
  updatePassword,
  getUserById,
  updateUserById,
  softDeleteUserById,
  followUser,
};
