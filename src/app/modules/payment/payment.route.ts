import express from "express";

import { paymentController } from "./payment.controller";

const router = express.Router();

router.post("/payment", paymentController.createPayment);
router.post("/confirmation", paymentController.confirmationController);
router.post("/failure", paymentController.failureController);
router.get("/payments", paymentController.getAllPayments);
router.get("/payments/:paymentId", paymentController.getPaymentById);
router.get("/payments/user/:userId", paymentController.getPaymentByUserId);
export const paymentRoutes = router;
