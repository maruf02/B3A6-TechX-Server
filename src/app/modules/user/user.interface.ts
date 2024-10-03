import { USER_ROLE } from "./user.constant";

export type TUser = {
  name: string;
  email: string;
  image?: string;
  role?: "user" | "admin";
  isBlock?: "Yes" | "No";
  isDeleted?: boolean;
  password: string;
  phone: string;
  address: string;
  paymentStatus: string;
  PayDate: string;
  PayStartTime: string;
  PayEndTime: string;
};

export type TUserRole = keyof typeof USER_ROLE;
