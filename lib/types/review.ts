import { Session } from "next-auth";
import { Book } from ".";

export type Review = {
  id: string;
  user: Session["user"];
  book: Book;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ReviewFilterRequest = {
  bookId?: number;
};

export type ReviewRequest = {
  bookId: number;
  rating: number;
  comment: string;
};
