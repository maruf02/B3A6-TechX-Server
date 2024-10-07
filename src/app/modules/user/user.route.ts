import express from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.post("/auth/signup", userController.createUser);
router.post("/follow/:id", userController.followUser);
router.get("/auth/users", userController.getAllUsers);
router.get("/auth/usersId/:id", userController.getUserById);
router.get("/auth/usersEmail/:email", userController.getUserByEmail);
router.put("/auth/usersPass/:email", userController.updatePassword);
router.put("/auth/usersInfo/:id", userController.updateUserById);
router.delete("/auth/users/:id", userController.softDeleteUserById);

export const UserRoutes = router;
