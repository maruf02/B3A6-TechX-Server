import express from "express";
import { carController } from "./car.controller";

import { bookingController } from "../booking/booking.controller";
import auth from "../middleware/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/cars", auth(USER_ROLE.admin), carController.createCar);
// router.post("/cars", carController.createCar);
router.get("/cars", carController.getAllCars);
router.get("/cars/:id", carController.getSingleCar);
router.put(
  "/cars/return",
  auth(USER_ROLE.admin),
  bookingController.returnBooking
);
router.put("/cars/:id", auth(USER_ROLE.admin), carController.updateCarById);
router.delete("/cars/:id", auth(USER_ROLE.admin), carController.deleteCar);

export const carRoutes = router;
