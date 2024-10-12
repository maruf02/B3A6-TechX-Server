import { TloginActivity } from "./loginActivity.interface";
import { loginActivityModel } from "./loginActivity.model";

const createLoginActivityInDB = async (activity: TloginActivity) => {
  const result = await loginActivityModel.create(activity);
  return result;
};

const getAllLoginActivitiesFromDB = async () => {
  const activities = await loginActivityModel.find();
  return activities;
};

export const loginActivityServices = {
  createLoginActivityInDB,
  getAllLoginActivitiesFromDB,
};
