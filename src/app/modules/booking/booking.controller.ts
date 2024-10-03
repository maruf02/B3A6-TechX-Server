import { Request, Response } from "express";
import { bookingService } from "./booking.service";
import { StatusCodes } from "http-status-codes";

// import { bookingValidationSchema } from "./booking.validation";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";
import moment from "moment";
import AppError from "../utils/AppError";
// import moment from "moment";
// import { decode } from "jsonwebtoken";

// const createBooking = catchAsync(async (req: Request, res: Response) => {
//   const { carId, date, startTime } = req.body;
//   const { _id } = req.userAll;
//   const today = moment().startOf("day"); // Start of today's date
//   const bookingDate = moment(date).startOf("day"); // Start of the booking date

//   if (bookingDate.isBefore(today)) {
//     throw new AppError(
//       StatusCodes.BAD_REQUEST,
//       "Booking date cannot be in the past"
//     );
//   }
//   const bookingData = {
//     car: carId,
//     user: _id,
//     date,
//     startTime,
//   };
//   const result = await bookingService.createBookingIntoDB(bookingData);

//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: "Booking is created successfully",
//     data: result,
//   });
// });

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const {
    carId,
    date,
    startTime,
    DLicense,
    additionInfo,
    nid,
    passport,
    paymentInfo,
  } = req.body;
  const { _id } = req.userAll;
  const today = moment().startOf("day");
  const bookingDate = moment(date).startOf("day");

  if (bookingDate.isBefore(today)) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Booking date cannot be in the past"
    );
  }

  const bookingData = {
    car: carId,
    user: _id,
    date,
    startTime,
    DLicense,
    additionInfo,
    nid,
    passport,
    paymentInfo,
  };

  const result = await bookingService.createBookingIntoDB(bookingData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking is created successfully",
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await bookingService.getAllBookingFromDB();
  console.log("2", result);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});
const getAllBookingQuery = catchAsync(async (req: Request, res: Response) => {
  const { carId, date } = req.query;
  console.log(carId, date);
  const result = await bookingService.getAllBookingQueryFromDB(
    carId as string,
    date as string
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getBookingByUserId = catchAsync(async (req: Request, res: Response) => {
  console.log("objectJWT", req.userAll); //login id ace
  const { _id, email } = req.userAll;
  console.log(email);
  const result = await bookingService.getBookingByUserIdFromDB(_id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const returnBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId, endTime } = req.body;
  const result = await bookingService.returnBookingFromDB(bookingId, endTime);

  console.log(result);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking returned successfully",
    data: result,
  });
});
const updateBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const updateData = req.body;

  const result = await bookingService.updateBookingInDB(bookingId, updateData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking updated successfully",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const result = await bookingService.deleteBookingFromDB(bookingId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Booking deleted successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBooking,
  getBookingByUserId,
  getAllBookingQuery,
  returnBooking,
  updateBooking,
  deleteBooking,
};
