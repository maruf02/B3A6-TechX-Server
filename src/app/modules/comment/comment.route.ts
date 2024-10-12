import express from "express";
import { commentController } from "./comment.controller";

const router = express.Router();

router.post("/comments", commentController.createComment);
router.get("/allComments", commentController.getAllComments);
router.get("/comments/:postId", commentController.getCommentsByPostId);

router.put("/comments/:commentId", commentController.updateCommentById);

router.delete("/comments/:commentId", commentController.deleteCommentById);

export const commentRoutes = router;
