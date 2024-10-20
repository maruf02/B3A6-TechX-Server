import { Request, Response } from "express";
import { postServices } from "./post.service";
import { PostModel } from "./post.model";

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
    const userId = req.params.userId;
    const posts = await postServices.getPostsByUserIdFromDB(userId);

    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by userId:", error);
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

const addViewToPost = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const postId = req.params.id;
    console.log(postId, userId);
    const updatedPost = await postServices.addViewToPostInDB(postId, userId);
    return res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add view" });
  }
};

const getAllViewCounts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find(); // Fetch all posts
    const viewCounts: { [key: string]: number } = {}; // Object to hold counts

    // Aggregate views by date
    posts.forEach((post) => {
      const views = post.views || []; // Get views or default to an empty array

      views.forEach(([date]) => {
        if (viewCounts[date]) {
          viewCounts[date] += 1; // Increment count if date exists
        } else {
          viewCounts[date] = 1; // Initialize count for new date
        }
      });
    });

    // Convert viewCounts object to an array of desired format
    const result = Object.entries(viewCounts).map(([date, count]) => ({
      date,
      views: count,
    }));

    return res.status(200).json(result); // Send the aggregated counts as response
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ message: "Failed to get view counts" });
  }
};

const getAllLikesCounts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find(); // Fetch all posts
    const likeCounts: { [key: string]: number } = {}; // Object to hold counts

    // Aggregate likes by date
    posts.forEach((post) => {
      const likes = post.likes || []; // Get likes or default to an empty array

      likes.forEach(([date]) => {
        // const date = new Date().toISOString().split("T")[0]; // Current date
        if (likeCounts[date]) {
          likeCounts[date] += 1; // Increment count if today's date exists
        } else {
          likeCounts[date] = 1; // Initialize count for today's date
        }
      });
    });

    // Convert likeCounts object to an array of desired format
    const result = Object.entries(likeCounts).map(([date, count]) => ({
      date,
      likes: count,
    }));

    return res.status(200).json(result); // Send the aggregated counts as response
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ message: "Failed to get like counts" });
  }
};

const getAllDislikesCounts = async (req: Request, res: Response) => {
  try {
    const posts = await PostModel.find(); // Fetch all posts
    const dislikeCounts: { [key: string]: number } = {}; // Object to hold counts

    // Aggregate dislikes by date
    posts.forEach((post) => {
      const dislikes = post.dislikes || []; // Get dislikes or default to an empty array

      dislikes.forEach(([date]) => {
        // const date = new Date().toISOString().split("T")[0]; // Current date
        if (dislikeCounts[date]) {
          dislikeCounts[date] += 1; // Increment count if today's date exists
        } else {
          dislikeCounts[date] = 1; // Initialize count for today's date
        }
      });
    });

    // Convert dislikeCounts object to an array of desired format
    const result = Object.entries(dislikeCounts).map(([date, count]) => ({
      date,
      dislikes: count,
    }));

    return res.status(200).json(result); // Send the aggregated counts as response
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ message: "Failed to get dislike counts" });
  }
};

const getTotalLikesHandler = async (req: Request, res: Response) => {
  try {
    const totalLikes = await postServices.getTotalLikes();
    return res.status(200).json({ totalLikes }); // Send the total likes count as response
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ message: "Failed to fetch total likes" });
  }
};

const getTotalDislikesHandler = async (req: Request, res: Response) => {
  try {
    const totalDislikes = await postServices.getTotalDislikes();
    return res.status(200).json({ totalDislikes }); // Send the total dislikes count as response
  } catch (error) {
    console.error(error); // Log error for debugging
    return res.status(500).json({ message: "Failed to fetch total dislikes" });
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
  addViewToPost,
  getAllViewCounts,
  getAllLikesCounts,
  getAllDislikesCounts,
  getTotalLikesHandler,
  getTotalDislikesHandler,
};
