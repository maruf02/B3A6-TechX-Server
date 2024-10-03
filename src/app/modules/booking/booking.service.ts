import { BookingModel } from "./booking.model";
import { TBooking } from "./booking.interface";
import { CarModel } from "../car/car.model";
import { error } from "console";
import moment from "moment";
import { calculateTotalCost } from "./convertTimeAndPriceCalcutaion";
import AppError from "../utils/AppError";
import { StatusCodes } from "http-status-codes";

type TReturnData = {
  bookingId: string;
  endTime: string;
};

// const createBookingIntoDB = async (bookingData: TBooking) => {
//   // const { car, user } = bookingData;
//   const { car, user, date, startTime } = bookingData;
//   const cars = await CarModel.findById(car);
//   const carStatus = cars?.status;
//   // console.log(carStatus);
//   if (carStatus === "unavailable") {
//     // console.log("already booked");
//     throw new AppError(StatusCodes.FORBIDDEN, "already booked");
//   }
//   // const booking = await BookingModel.create(bookingData);
//   const booking = await BookingModel.create({
//     car,
//     user,
//     date,
//     startTime,
//   });

//   await CarModel.updateOne({ _id: car }, { $set: { status: "unavailable" } });
//   const populatedBooking = (
//     await booking.populate("user", "-password -createdAt -updatedAt -__v")
//   ).populate("car", "-__v");
//   return populatedBooking;
// };

const getAllBookingFromDB = async () => {
  const cars = await BookingModel.find();

  return cars;
};
const getAllBookingQueryFromDB = async (carId?: string, date?: string) => {
  let query: any = {};

  if (carId) {
    query.car = carId;
  }

  if (date) {
    query.date = date;
  }
  // console.log(query);
  // console.log(carId, date);
  const bookings = await BookingModel.find(query)
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");
  return bookings;
};

const createBookingIntoDB = async (bookingData: TBooking) => {
  try {
    const { car, user, date, startTime } = bookingData;
    const cars = await CarModel.findById(car);
    const carStatus = cars?.status;

    if (carStatus === "unavailable") {
      throw new AppError(StatusCodes.FORBIDDEN, "Car is already booked");
    }

    const booking = await BookingModel.create(bookingData);

    await CarModel.updateOne({ _id: car }, { $set: { status: "unavailable" } });

    const populatedBooking = (
      await booking.populate("user", "-password -createdAt -updatedAt -__v")
    ).populate("car", "-__v");

    return populatedBooking;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      // error.message as string
      "An unknown error occurred."
    );
  }
};
const getBookingByUserIdFromDB = async (userId: string) => {
  // const userId = "666b07c07e36eebd720beab5";
  const myBookings = await BookingModel.find({ user: userId })
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");
  return myBookings;
};

const returnBookingFromDB = async (bookingId: string, endTime: string) => {
  const bookingDetails = await BookingModel.findById(bookingId).populate("car");
  if (!bookingDetails) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }

  const { startTime, car } = bookingDetails;

  if (!car) {
    throw new AppError(StatusCodes.NOT_FOUND, "Car not found for the booking");
  }

  const { pricePerHour: price } = car as any;

  const totalCost = calculateTotalCost(startTime, endTime, price);

  const updatedBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    { $set: { endTime: endTime, totalCost: totalCost } },
    { new: true }
  )
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");

  await CarModel.updateOne({ _id: car._id }, { $set: { status: "available" } });
  return updatedBooking;
};

const updateBookingInDB = async (
  bookingId: string,
  updateData: Partial<TBooking>
) => {
  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }

  // Update the booking with the new data
  const updatedBooking = await BookingModel.findByIdAndUpdate(
    bookingId,
    { $set: updateData },
    { new: true } // Return the updated document
  )
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");

  return updatedBooking;
};

const deleteBookingFromDB = async (bookingId: string) => {
  const booking = await BookingModel.findById(bookingId);

  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, "Booking not found");
  }

  const { car } = booking;

  // Delete the booking
  await BookingModel.findByIdAndDelete(bookingId);

  // Update the car status to 'available'
  await CarModel.updateOne({ _id: car }, { $set: { status: "available" } });

  return booking;
};

export const bookingService = {
  createBookingIntoDB,
  getAllBookingFromDB,
  getBookingByUserIdFromDB,
  getAllBookingQueryFromDB,
  returnBookingFromDB,
  updateBookingInDB,
  deleteBookingFromDB,
};
