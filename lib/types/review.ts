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

export type ReviewRequest = {
  bookId?: number;
};
