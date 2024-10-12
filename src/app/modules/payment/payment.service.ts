// payment.service.ts
import { StatusCodes } from "http-status-codes";

import { UserModel } from "../user/user.model";
import AppError from "../utils/AppError";
import { TPayment } from "./payment.interface";
import { PaymentModel } from "./payment.model";
import { initiatePayment, paymentVerify } from "./payment.utils";

// const createPaymentIntoDB = async (payment: TPayment) => {
//   try {
//     const generateTransactionId = () => {
//       const timestamp = Date.now();
//       const randomPart = Math.random().toString(36).substring(2, 15);
//       return `${timestamp}-${randomPart}`;
//     };

//     const transactionId = generateTransactionId();

//     const paymentData = {
//       ...payment,
//       transactionId,
//     };

//     const result = await PaymentModel.create(paymentData);

//     const user = await UserModel.findById(result.userId).select("-password");

//     const paymentSession = await initiatePayment({
//       transactionId,
//       name: user?.name,
//       email: user?.email,
//       phone: user?.phone,
//       address: user?.address,
//       totalPrice: result.amount,
//     });

//     return paymentSession;
//   } catch (error) {
//     console.error("Service: Error saving payment to DB:", error);
//     throw error;
//   }
// };

const createPaymentIntoDB = async (payment: TPayment) => {
  try {
    const generateTransactionId = () => {
      const timestamp = Date.now();
      const randomPart = Math.random().toString(36).substring(2, 15);
      return `${timestamp}-${randomPart}`;
    };

    const transactionId = generateTransactionId();

    const paymentData = {
      ...payment,
      transactionId,
    };

    const result = await PaymentModel.create(paymentData);

    if (!result) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Failed to create payment record."
      );
    }

    const user = await UserModel.findById(result.userId).select("-password");

    const paymentSession = await initiatePayment({
      transactionId,
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      totalPrice: result.amount,
    });

    return paymentSession;
  } catch (error) {
    console.error("Service: Error saving payment to DB:", error);
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Failed to create payment."
    );
  }
};

const confirmationService = async (transactionId: string) => {
  const verifyResponse = await paymentVerify(transactionId);
  console.log("verifyResponse", verifyResponse);

  const payment = await PaymentModel.findOne({ transactionId });
  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Payment record not found");
  }

  return payment;
};

// *************************************************
const getAllPaymentsFromDB = async () => {
  const payments = await PaymentModel.find().populate("userIdP");
  return payments;
};

const getPaymentByIdFromDB = async (paymentId: string) => {
  const payment = await PaymentModel.findById(paymentId).populate("userIdP");
  if (!payment) {
    throw new AppError(StatusCodes.NOT_FOUND, "Payment not found");
  }
  return payment;
};

const getPaymentByUserIdFromDB = async (userId: string) => {
  const payments = await PaymentModel.find({ userId }).populate("userIdP");
  return payments;
};

export const paymentService = {
  createPaymentIntoDB,
  confirmationService,
  getAllPaymentsFromDB,
  getPaymentByIdFromDB,
  getPaymentByUserIdFromDB,
};
