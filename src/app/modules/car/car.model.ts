import { Schema, model } from "mongoose";
import { TCar } from "./car.interface";
import { number } from "zod";

const carSchema = new Schema<TCar>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    // isElectric: {
    //   type: Boolean,
    //   required: true,
    // },
    category: {
      type: String,
      enum: ["Sedan", "SUV", "Sports Car", "Hybrid", "Electric"],
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },

    images: {
      type: [String],
      required: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

carSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const CarModel = model<TCar>("Car", carSchema);
