import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>({
  date: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  payment: {
    type: String,
    enum: ["unPaid", "Paid"],
    default: "unPaid",
  },
  startTime: {
    type: String,
    required: true,
  },
  nid: {
    type: String,
    required: true,
  },
  passport: {
    type: String,
    required: true,
  },
  DLicense: {
    type: String,
    required: true,
  },
  paymentInfo: {
    type: String,
    required: true,
  },
  additionInfo: {
    type: [String],
    required: true,
  },
  endTime: {
    type: String,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
});

export const BookingModel = model<TBooking>("Booking", bookingSchema);
