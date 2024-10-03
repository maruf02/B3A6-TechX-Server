import express from "express";

import { paymentController } from "./payment.controller";

const router = express.Router();

router.post("/payment", paymentController.createPayment);
router.post("/confirmation", paymentController.confirmationController);
router.post("/failure", paymentController.failureController);
router.get("/payments", paymentController.getAllPayments); // Get all payments
router.get("/payments/:paymentId", paymentController.getPaymentById); // Get payment by ID
router.get("/payments/user/:userId", paymentController.getPaymentByUserId);
export const paymentRoutes = router;
