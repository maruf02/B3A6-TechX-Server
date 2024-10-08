import express from "express";
import validateRequest from "../middleware/validateRequest";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post("/auth/signin", AuthControllers.loginUser);
router.post("/auth/refresh-token", AuthControllers.refreshToken);
router.post("/auth/logout", AuthControllers.logoutUser);

export const authRoutes = router;
