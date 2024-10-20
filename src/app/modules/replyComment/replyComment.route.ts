import express from "express";
import { replyCommentController } from "./replyComment.controller";

const router = express.Router();

router.post("/repliesComment", replyCommentController.createReply);
router.get("/repliesAllComment", replyCommentController.getAllReplies);
router.get(
  "/replies/commentByCID/:commentId",
  replyCommentController.getRepliesByCommentId
);

export const ReplyCommentRoutes = router;
