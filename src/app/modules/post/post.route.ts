import express from "express";
import { postController } from "./post.controller";

const router = express.Router();

router.post("/posts", postController.createPost);
router.post("/posts/:id/like", postController.likePost);
router.post("/posts/:id/dislike", postController.dislikePost);
router.get("/posts", postController.getAllPosts);
router.get("/posts/user/:userId", postController.getPostsByUserId); // Add this line to your routes
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", postController.updatePostById);
// Assuming you are using Express

router.delete("/posts/:id", postController.softDeletePostById);

export const PostRoutes = router;
