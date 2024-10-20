import { Request, Response } from "express";
import { replyCommentServices } from "./replyComment.service";

const createReply = async (req: Request, res: Response) => {
  try {
    const newReply = await replyCommentServices.createReplyInDB(req.body);
    return res.status(201).json(newReply);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create reply", error });
  }
};

const getAllReplies = async (req: Request, res: Response) => {
  try {
    const replies = await replyCommentServices.getAllRepliesFromDB();
    return res.status(200).json(replies);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve replies", error });
  }
};

const getRepliesByCommentId = async (req: Request, res: Response) => {
  try {
    const replies = await replyCommentServices.getRepliesByCommentIdFromDB(
      req.params.commentId
    );
    return res.status(200).json(replies);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve replies", error });
  }
};

export const replyCommentController = {
  createReply,
  getAllReplies,
  getRepliesByCommentId,
};
