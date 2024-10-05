import { z } from "zod";

export const userValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["user", "admin"]).optional().default("user"),
  isBlock: z.enum(["Yes", "No"]).optional().default("No"),
  isDeleted: z.boolean().optional(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  profileImage: z.string(),
  coverImage: z.string(),
});
