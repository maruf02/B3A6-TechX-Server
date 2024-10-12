import { Request, Response } from "express";
import { loginActivityServices } from "./loginActivity.service";

const createLoginActivity = async (req: Request, res: Response) => {
  try {
    const newActivity = await loginActivityServices.createLoginActivityInDB(
      req.body
    );
    return res.status(201).json(newActivity);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create login activity" });
  }
};

const getAllLoginActivities = async (req: Request, res: Response) => {
  try {
    const activities =
      await loginActivityServices.getAllLoginActivitiesFromDB();
    return res.status(200).json(activities);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch login activities" });
  }
};

export const loginActivityController = {
  createLoginActivity,
  getAllLoginActivities,
};
