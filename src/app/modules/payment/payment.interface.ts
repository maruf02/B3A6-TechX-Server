import { Document } from "mongoose";

export interface TPayment extends Document {
  userId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  transactionId: string;
  date: string;
  startTime: string;
  endTime: string;
}
