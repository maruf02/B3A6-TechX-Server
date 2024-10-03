import { z } from "zod";

export const createCarValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  color: z.string(),
  paymentInfo: z.string(),
  isElectric: z.boolean(),
  category: z.enum(["Sedan", "SUV", "Sports Car", "Hybrid", "Electric"]),
  status: z.enum(["available", "unavailable"]).optional(),
  features: z.string().array(),
  pricePerHour: z.number(),
  isDeleted: z.boolean().optional(),
});
export const updateCarValidationSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  color: z.string().optional(),
  isElectric: z.boolean().optional(),
  category: z.enum(["Sedan", "SUV", "Sports Car", "Hybrid", "Electric"]),
  status: z.enum(["available", "unavailable"]).optional(),
  features: z.string().array().optional(),
  pricePerHour: z.number().optional(),
  isDeleted: z.boolean().optional(),
});
