// Adjust the import path as necessary
import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";

// Create a new comment
const createCommentInDB = async (commentData: TComment): Promise<TComment> => {
  const newComment = new CommentModel(commentData);
  return await newComment.save();
};

// Read (get) all comments for a specific post
const getCommentsByPostIdFromDB = async (
  postId: string
): Promise<TComment[]> => {
  return await CommentModel.find({ postId }).populate("userIdP");
};

// Update an existing comment
const updateCommentByIdInDB = async (
  commentId: string,
  updatedData: Partial<TComment>
): Promise<TComment | null> => {
  return await CommentModel.findByIdAndUpdate(commentId, updatedData, {
    new: true,
  });
};

// Delete a comment
const deleteCommentByIdInDB = async (
  commentId: string
): Promise<TComment | null> => {
  return await CommentModel.findByIdAndDelete(commentId);
};

export const commentServices = {
  createCommentInDB,
  getCommentsByPostIdFromDB,
  updateCommentByIdInDB,
  deleteCommentByIdInDB,
};
