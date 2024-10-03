import { Request, Response } from "express";
import { postServices } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const newPost = await postServices.createPostInDB(req.body);
    console.log(newPost);
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create post" });
  }
};

const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await postServices.getAllPostsFromDB();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await postServices.getPostByIdFromDB(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch post" });
  }
};

const getPostsByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId; // Get the userId from the request parameters
    const posts = await postServices.getPostsByUserIdFromDB(userId); // Call the service function

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by userId:", error); // Log the error for debugging
    return res.status(500).json({ message: "Failed to fetch posts by userId" });
  }
};

const updatePostById = async (req: Request, res: Response) => {
  try {
    const updatedPost = await postServices.updatePostByIdInDB(
      req.params.id,
      req.body
    );
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update post" });
  }
};

const softDeletePostById = async (req: Request, res: Response) => {
  try {
    const deletedPost = await postServices.softDeletePostByIdFromDB(
      req.params.id
    );
    return res.status(200).json(deletedPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete post" });
  }
};

const likePost = async (req: Request, res: Response) => {
  try {
    const { postId, userId } = req.body;
    console.log(postId, userId);
    const updatedPost = await postServices.likePostByIdInDB(postId, userId);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to like post" });
  }
};

const dislikePost = async (req: Request, res: Response) => {
  try {
    const { postId, userId } = req.body;
    const updatedPost = await postServices.dislikePostByIdInDB(postId, userId);
    return res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(500).json({ message: "Failed to dislike post" });
  }
};

export const postController = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  softDeletePostById,
  getPostsByUserId,
  likePost,
  dislikePost,
};
