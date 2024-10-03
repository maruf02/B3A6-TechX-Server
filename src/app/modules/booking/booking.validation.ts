import { z } from "zod";

export const bookingValidationSchema = z.object({
  date: z.date(),
  user: z.string(),
  car: z.string(),
  status: z.enum(["pending", "approved"]).optional(),
  payment: z.enum(["unPaid", "Paid"]).optional(),
  startTime: z.string(),
  nid: z.string(),
  passport: z.string(),
  DLicense: z.string(),
  endTime: z.string(),
  additionInfo: z.string().array(),
  totalCost: z.number().default(0),
});
