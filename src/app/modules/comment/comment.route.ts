import express from "express";
import { commentController } from "./comment.controller";

const router = express.Router();

// Create comment
router.post("/comments", commentController.createComment);

// Get comments by post ID
router.get("/comments/:postId", commentController.getCommentsByPostId);

// Update comment
router.put("/comments/:commentId", commentController.updateCommentById);

// Delete comment
router.delete("/comments/:commentId", commentController.deleteCommentById);

export const commentRoutes = router;
