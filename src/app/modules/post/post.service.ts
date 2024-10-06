import { PostModel } from "./post.model";
import { TPost } from "./post.interface";

const createPostInDB = async (post: TPost) => {
  const result = await PostModel.create(post);
  return result;
};

// const getAllPostsFromDB = async () => {
//   const posts = await PostModel.find();
//   return posts;
// };
const getAllPostsFromDB = async () => {
  const posts = await PostModel.find().populate("userIdP"); // Populate userId with full user info
  return posts;
};

// const getPostByIdFromDB = async (id: string) => {
//   const post = await PostModel.findById(id);
//   return post;
// };
const getPostByIdFromDB = async (id: string) => {
  const post = await PostModel.findById(id).populate("userIdP"); // Populate userId with full user info
  return post;
};

// const getPostsByUserIdFromDB = async (userId: string) => {
//   const posts = await PostModel.find({ userId: userId }); // Find posts where userId matches
//   return posts;
// };
const getPostsByUserIdFromDB = async (userId: string) => {
  const posts = await PostModel.find({ userId: userId }).populate("userIdP"); // Populate userId with full user info
  return posts;
};

const updatePostByIdInDB = async (id: string, post: Partial<TPost>) => {
  const updatedPost = await PostModel.findByIdAndUpdate(id, post, {
    new: true,
  });
  return updatedPost;
};

const softDeletePostByIdFromDB = async (id: string) => {
  const deletedPost = await PostModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return deletedPost;
};

const likePostByIdInDB = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already liked the post
  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((id) => id !== userId); // Remove like
  } else {
    post.likes.push(userId); // Add like
    post.dislikes = post.dislikes.filter((id) => id !== userId); // Remove dislike if exists
  }

  await post.save();
  return post;
};

const dislikePostByIdInDB = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user has already disliked the post
  if (post.dislikes.includes(userId)) {
    post.dislikes = post.dislikes.filter((id) => id !== userId); // Remove dislike
  } else {
    post.dislikes.push(userId); // Add dislike
    post.likes = post.likes.filter((id) => id !== userId); // Remove like if exists
  }

  await post.save();
  return post;
};

export const postServices = {
  createPostInDB,
  getAllPostsFromDB,
  getPostByIdFromDB,
  updatePostByIdInDB,
  softDeletePostByIdFromDB,
  getPostsByUserIdFromDB,
  likePostByIdInDB,
  dislikePostByIdInDB,
};
