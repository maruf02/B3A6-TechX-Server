export type TCar = {
  name: string;
  description: string;
  color: string;
  rating: number;
  model: string;
  year: string;
  // isElectric: boolean;
  category: "Sedan" | "SUV" | "Sports Car" | "Hybrid" | "Electric";
  status?: "available" | "unavailable";
  features: string[];
  images: string[];
  pricePerHour: number;
  isDeleted?: boolean;
};
