import { Author } from "./author";
import { Category } from "./category";
import { Image } from "./image";
import { Pdf } from "./pdf";

export type Book = {
  id: number;
  title: string;
  description?: string;
  category: Category;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  reviewCount: number;
  pdf?: Pdf;
  slug: string;
  totalPages: number;
  image: Image | null;
  author: Author;
};
