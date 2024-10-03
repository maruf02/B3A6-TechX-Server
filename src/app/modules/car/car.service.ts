import { TCar } from "./car.interface";
import { CarModel } from "./car.model";

const createCarIntoDB = async (car: TCar) => {
  const result = await CarModel.create(car);
  return result;
};
const getAllCarsFromDB = async () => {
  const cars = await CarModel.find();
  // console.log("object");
  return cars;
};

const getCarByIdFromDB = async (id: string) => {
  const cars = await CarModel.findById(id);
  return cars;
};

const updateCarByIdInDB = async (carId: string, carData: TCar) => {
  const cars = await CarModel.findByIdAndUpdate(carId, carData, {
    new: true,
  });
  return cars;
};

const deleteCarFromDB = async (id: string) => {
  const result = await CarModel.findByIdAndUpdate(
    id,
    { $set: { isDeleted: true } },
    { new: true }
  );
  return result;
};

export const carService = {
  createCarIntoDB,
  getAllCarsFromDB,
  getCarByIdFromDB,
  updateCarByIdInDB,
  deleteCarFromDB,
};
