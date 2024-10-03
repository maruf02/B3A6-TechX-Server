import { error } from "console";
import { StatusCodes } from "http-status-codes";
import { UserModel } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import AppError from "../utils/AppError";
import config from "../../config";
import jwt, { JwtPayload } from "jsonwebtoken";

const loginUser = async (payload: TLoginUser) => {
  console.log(payload); //body theke asa email r password
  const isUserExist = await UserModel.findOne({ email: payload?.email }).select(
    "+password"
  );
  // user er sob data pawa jabe
  // console.log(isUserExist);
  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found !");
  }
  if (isUserExist.isBlock === "Yes") {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "Your account is blocked. Please contact support."
    );
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.FORBIDDEN, "Password Not Matched");
  }
  const jwtPayload = {
    _id: isUserExist.id,
    name: isUserExist.name,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: "365d",
    }
  );
  const { password, ...userWithoutPassword } = isUserExist.toObject();

  return { user: userWithoutPassword, accessToken, refreshToken };
};

const refreshToken = async (token: string, payload: TLoginUser) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { userId, iat } = decoded;

  // checking if the user is exist
  const isUserExist = await UserModel.findOne({ email: payload?.email }).select(
    "+password"
  );

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "This user is not found !");
  }

  // // checking if the user is blocked
  // const userStatus = isUserExist?.status;

  // if (userStatus === "blocked") {
  //   throw new AppError(StatusCodes.FORBIDDEN, "This user is blocked ! !");
  // }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized !");
  // }

  const jwtPayload = {
    _id: isUserExist.id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
  };
};

export const AuthServices = {
  loginUser,
  refreshToken,
};
