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

// const likePostByIdInDB = async (postId: string, userId: string) => {
//   const post = await PostModel.findById(postId);
//   if (!post) {
//     throw new Error("Post not found");
//   }

//   if (post.likes.includes(userId)) {
//     post.likes = post.likes.filter((id) => id !== userId);
//   } else {
//     post.likes.push(userId);
//     post.dislikes = post.dislikes.filter((id) => id !== userId);
//   }

//   await post.save();
//   return post;
// };

// const dislikePostByIdInDB = async (postId: string, userId: string) => {
//   const post = await PostModel.findById(postId);
//   if (!post) {
//     throw new Error("Post not found");
//   }

//   if (post.dislikes.includes(userId)) {
//     post.dislikes = post.dislikes.filter((id) => id !== userId);
//   } else {
//     post.dislikes.push(userId);
//     post.likes = post.likes.filter((id) => id !== userId);
//   }

//   await post.save();
//   return post;
// };

const likePostByIdInDB = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Current date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Check if user has already liked the post
  const likeIndex = post.likes.findIndex((like) => like[1] === userId);
  if (likeIndex !== -1) {
    // Remove like if it exists
    post.likes.splice(likeIndex, 1);
  } else {
    // Add new like with date
    post.likes.push([today, userId]);
    // Remove from dislikes if exists
    post.dislikes = post.dislikes.filter((id) => id !== userId);
  }

  await post.save();
  return post;
};

const dislikePostByIdInDB = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Current date formatted as YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  // Check if user has already disliked the post
  const dislikeIndex = post.dislikes.findIndex(
    (dislike) => dislike[1] === userId
  );
  if (dislikeIndex !== -1) {
    // Remove dislike if it exists
    post.dislikes.splice(dislikeIndex, 1);
  } else {
    // Add new dislike with date
    post.dislikes.push([today, userId]);
    // Remove from likes if exists
    post.likes = post.likes.filter((id) => id !== userId);
  }

  await post.save();
  return post;
};

const addViewToPostInDB = async (postId: string, userId: string) => {
  const post = await PostModel.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }
  console.log(postId, userId);
  // Ensure views array is initialized
  if (!post.views) {
    post.views = []; // Initialize if undefined
  }

  const today = new Date().toISOString().split("T")[0]; // Format date as YYYY-MM-DD
  post.views.push([today, userId]);

  await post.save();
  return post;
};

const getAllViewsFromPosts = async () => {
  const posts = await PostModel.find(); // Fetch all posts
  const viewCounts: { [key: string]: number } = {}; // Object to hold counts

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

  return viewCounts; // Return aggregated view counts
};

const getAllLikesFromPosts = async () => {
  const posts = await PostModel.find(); // Fetch all posts
  const likeCounts: { [key: string]: number } = {}; // Object to hold counts

  posts.forEach((post) => {
    const likes = post.likes || []; // Get likes or default to an empty array

    likes.forEach(([date]) => {
      if (likeCounts[date]) {
        likeCounts[date] += 1; // Increment count if today's date exists
      } else {
        likeCounts[date] = 1; // Initialize count for today's date
      }
    });
  });

  return likeCounts; // Return aggregated like counts
};

const getAllDislikesFromPosts = async () => {
  const posts = await PostModel.find(); // Fetch all posts
  const dislikeCounts: { [key: string]: number } = {}; // Object to hold counts

  posts.forEach((post) => {
    const dislikes = post.dislikes || []; // Get dislikes or default to an empty array

    dislikes.forEach(([date]) => {
      // const today = new Date().toISOString().split("T")[0]; // Current date
      if (dislikeCounts[date]) {
        dislikeCounts[date] += 1; // Increment count if today's date exists
      } else {
        dislikeCounts[date] = 1; // Initialize count for today's date
      }
    });
  });

  return dislikeCounts; // Return aggregated dislike counts
};

const getTotalLikes = async () => {
  const posts = await PostModel.find(); // Fetch all posts
  let totalLikes = 0; // Initialize total likes count

  posts.forEach((post) => {
    totalLikes += post.likes.length; // Sum up likes for each post
  });

  return totalLikes; // Return total likes count
};

const getTotalDislikes = async () => {
  const posts = await PostModel.find(); // Fetch all posts
  let totalDislikes = 0; // Initialize total dislikes count

  posts.forEach((post) => {
    totalDislikes += post.dislikes.length; // Sum up dislikes for each post
  });

  return totalDislikes; // Return total dislikes count
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
  addViewToPostInDB,
  getAllViewsFromPosts,
  getAllLikesFromPosts,
  getAllDislikesFromPosts,
  getTotalLikes,
  getTotalDislikes,
};
