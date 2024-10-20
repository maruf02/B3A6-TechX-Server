import { TReplyComment } from "./replyComment.interface";
import { ReplyCommentModel } from "./replyComment.model";

const createReplyInDB = async (
  replyData: TReplyComment
): Promise<TReplyComment> => {
  const newReply = new ReplyCommentModel(replyData);
  return await newReply.save();
};

const getAllRepliesFromDB = async (): Promise<TReplyComment[]> => {
  return await ReplyCommentModel.find();
};

const getRepliesByCommentIdFromDB = async (
  commentId: string
): Promise<TReplyComment[]> => {
  return await ReplyCommentModel.find({ commentId }).populate("userIdP");
};

export const replyCommentServices = {
  createReplyInDB,
  getAllRepliesFromDB,
  getRepliesByCommentIdFromDB,
};
