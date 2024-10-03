import { Request, Response } from "express";
import { commentServices } from "./comment.service";

// Create a new comment
const createComment = async (req: Request, res: Response) => {
  try {
    const newComment = await commentServices.createCommentInDB(req.body);
    return res.status(201).json(newComment);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create comment", error });
  }
};

// Get all comments for a specific post
const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const comments = await commentServices.getCommentsByPostIdFromDB(
      req.params.postId
    );
    return res.status(200).json(comments);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to retrieve comments", error });
  }
};

// Update a comment
const updateCommentById = async (req: Request, res: Response) => {
  try {
    const updatedComment = await commentServices.updateCommentByIdInDB(
      req.params.commentId,
      req.body
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update comment", error });
  }
};

// Delete a comment
const deleteCommentById = async (req: Request, res: Response) => {
  try {
    const deletedComment = await commentServices.deleteCommentByIdInDB(
      req.params.commentId
    );
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete comment", error });
  }
};

export const commentController = {
  createComment,
  getCommentsByPostId,
  updateCommentById,
  deleteCommentById,
};
