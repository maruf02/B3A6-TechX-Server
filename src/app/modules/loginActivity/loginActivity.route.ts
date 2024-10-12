import express from "express";
import { loginActivityController } from "./loginActivity.controller";
const router = express.Router();

router.post("/loginActivity", loginActivityController.createLoginActivity);

router.get("/loginActivities", loginActivityController.getAllLoginActivities);

export const loginActivityRoutes = router;
