import { TComment } from "./comment.interface";
import { CommentModel } from "./comment.model";

const createCommentInDB = async (commentData: TComment): Promise<TComment> => {
  const newComment = new CommentModel(commentData);
  return await newComment.save();
};

const getCommentsByPostIdFromDB = async (
  postId: string
): Promise<TComment[]> => {
  return await CommentModel.find({ postId }).populate("userIdP");
};

const updateCommentByIdInDB = async (
  commentId: string,
  updatedData: Partial<TComment>
): Promise<TComment | null> => {
  return await CommentModel.findByIdAndUpdate(commentId, updatedData, {
    new: true,
  });
};

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
