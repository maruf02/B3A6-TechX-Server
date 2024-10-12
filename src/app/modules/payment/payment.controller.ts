import sendResponse from "../utils/sendResponse";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { paymentService } from "./payment.service";
import catchAsync from "../utils/cacheAsync";
interface CustomError extends Error {
  statusCode?: number; // Optional, depending on your needs
  code?: string; // You can define any specific error codes if necessary
}

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;

  try {
    const result = await paymentService.createPaymentIntoDB(paymentData);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Payment created successfully",
      data: result,
    });
  } catch (error) {
    const customError = error as CustomError;
    sendResponse(res, {
      success: false,
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Failed to create payment",
      data: customError.message,
    });
  }
});

const confirmationController = catchAsync(
  async (req: Request, res: Response) => {
    const { transactionId } = req.query;

    if (typeof transactionId !== "string") {
      return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
    }

    const result = await paymentService.confirmationService(transactionId);
    res.send(`<html>
        <head>
          <title>Payment Successful</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: green; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; text-decoration: none; color: white; background-color: #007bff; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Payment Successful</h1>
          <p>Your payment has been successfully processed.</p>
          <a href="https://techx-client.vercel.app/profile/user">Back to Payment Management</a>
        </body>
      </html>`);
  }
);

const failureController = catchAsync(async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  if (typeof transactionId !== "string") {
    return res.status(StatusCodes.BAD_REQUEST).send("Invalid transaction ID");
  }

  // Assuming there's logic to handle failure (this needs to be implemented)
  res.send(`
      <html>
        <head>
          <title>Payment Failed</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
            h1 { color: red; }
            a { display: inline-block; margin-top: 20px; padding: 10px 20px; font-size: 16px; text-decoration: none; color: white; background-color: #007bff; border-radius: 5px; }
          </style>
        </head>
        <body>
          <h1>Payment Failed</h1>
          <p>Unfortunately, your payment could not be processed. Please try again later.</p>
          <a href="https://techx-client.vercel.app/profile/user">Back to Payment Management</a>
        </body>
      </html>
    `);
});

// **************************************
const getAllPayments = catchAsync(async (req: Request, res: Response) => {
  const payments = await paymentService.getAllPaymentsFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Payments retrieved successfully",
    data: payments,
  });
});

const getPaymentById = catchAsync(async (req: Request, res: Response) => {
  const { paymentId } = req.params;
  const payment = await paymentService.getPaymentByIdFromDB(paymentId);

  if (!payment) {
    return sendResponse(res, {
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: "Payment not found",
      data: null,
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Payment retrieved successfully",
    data: payment,
  });
});

const getPaymentByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const payments = await paymentService.getPaymentByUserIdFromDB(userId);

  if (payments.length === 0) {
    return sendResponse(res, {
      success: false,
      statusCode: StatusCodes.NOT_FOUND,
      message: "No payments found for the user",
      data: null,
    });
  }

  const payment = payments[0];

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Payment retrieved successfully for the user",
    data: payment,
  });
});

export const paymentController = {
  createPayment,
  confirmationController,
  failureController,
  getAllPayments,
  getPaymentById,
  getPaymentByUserId,
};
