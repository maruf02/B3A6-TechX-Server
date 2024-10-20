import express from "express";
import { postController } from "./post.controller";

const router = express.Router();

router.post("/posts", postController.createPost);
router.post("/posts/:id/like", postController.likePost);
router.post("/posts/:id/dislike", postController.dislikePost);
router.get("/posts", postController.getAllPosts);
router.get("/posts/user/:userId", postController.getPostsByUserId);
router.get("/posts/:id", postController.getPostById);
router.put("/posts/:id", postController.updatePostById);
router.post("/posts/:id/view", postController.addViewToPost);
router.delete("/posts/:id", postController.softDeletePostById);

router.get("/postsViews/views/count", postController.getAllViewCounts);
router.get("/likesSummary", postController.getAllLikesCounts);
router.get("/dislikesSummary", postController.getAllDislikesCounts);
router.get("/totalLikes", postController.getTotalLikesHandler);
router.get("/totalDislikes", postController.getTotalDislikesHandler);

export const PostRoutes = router;
