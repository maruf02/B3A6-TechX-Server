import { StatusCodes } from "http-status-codes";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";
import { AuthServices } from "./auth.service";

const transformUserResponse = (user: any, token: any) => {
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
    address: user.address,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { user, accessToken, refreshToken } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });
  res.cookie("accessToken", accessToken, {
    secure: false,
    httpOnly: true,
  });
  const response = transformUserResponse(
    user,
    accessToken.replace("Bearer ", "")
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: { response, accessToken: accessToken, refreshToken: refreshToken },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

const logoutUser = catchAsync(async (req, res) => {
  // Clear the accessToken and refreshToken cookies
  res.clearCookie("accessToken", {
    secure: false,
    httpOnly: true,
  });
  res.clearCookie("refreshToken", {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged out successfully",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  refreshToken,
  logoutUser,
};
