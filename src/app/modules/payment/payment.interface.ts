import { Document, Types } from "mongoose";

export interface TPayment extends Document {
  userIdP: Types.ObjectId;
  userId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  date: string;
  startTime: string;
  endTime: string;
}
