import { Types } from "mongoose";

export type TBooking = {
  date: string;
  // startDate: string;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string;
  status?: "pending" | "approved";
  payment?: "unPaid" | "Paid";
  nid: string;
  passport: string;
  DLicense: string;
  paymentInfo: string;
  additionInfo: string[];
  endTime?: string;
  totalCost?: number;
};
