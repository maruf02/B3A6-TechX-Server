export type TPost = {
  userId: string;
  name: string;
  post: string;
  category: "Web" | "Software" | "Engineering" | "AI";
  type?: "Free" | "Premium";
  images: string;
  likes: string[];
  dislikes: string[];
  isDeleted?: boolean;
};
