import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/cacheAsync";
import AppError from "../utils/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { TUserRole } from "../user/user.interface";
import { any } from "zod";
import { USER_ROLE } from "../user/user.constant";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const token = req.headers.authorization;
    // console.log(token);
    // // checking if the token is missing
    // // if (!token) {
    // //   throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    // // }
    // const authorizationHeader = req.headers.authorization;
    // if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    //   throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    // }
    // const token = authorizationHeader.split(" ")[1];
    // const decoded = jwt.verify(
    //   token,
    //   config.jwt_access_secret as string
    // ) as JwtPayload;
    // const { _id, role, userId, iat } = decoded;
    // if (requiredRoles && !requiredRoles.includes(role)) {
    //   throw new AppError(
    //     StatusCodes.UNAUTHORIZED,
    //     "You are not authorized  hi!"
    //   );
    // }
    // req.userAll = decoded as JwtPayload;
    // next();

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized!");
    }

    const token = authorizationHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "Invalid token");
    }

    const { _id, email, role } = decoded;
    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not authorized!");
    }

    req.userAll = decoded;
    next();
  });
};

export default auth;
