import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { carService } from "./car.service";
import catchAsync from "../utils/cacheAsync";
import sendResponse from "../utils/sendResponse";

const createCar = catchAsync(async (req: Request, res: Response) => {
  const car = req.body;
  const result = await carService.createCarIntoDB(car);
  // const car = req.body;
  // const zodParseDataUser = carValidationSchema.parse(car);
  // const result = await carService.createCarIntoDB(zodParseDataUser);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Car created successfully",
    data: result,
  });
});

const getAllCars = catchAsync(async (req: Request, res: Response) => {
  console.log(req.userAll);
  const result = await carService.getAllCarsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

const getSingleCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carService.getCarByIdFromDB(id);
  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: "Car not found",
      data: [],
    });
    return;
  }

  if (result.isDeleted) {
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.GONE,
      message: "This car has been deleted",
      data: null,
    });
    return;
  }
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

const updateCarById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const carData = req.body;
  const result = await carService.updateCarByIdInDB(id, carData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Car updated successfully",
    data: result,
  });
});

const deleteCar = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await carService.deleteCarFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Car deleted successfully",
    data: result,
  });
});

export const carController = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCarById,
  deleteCar,
};
