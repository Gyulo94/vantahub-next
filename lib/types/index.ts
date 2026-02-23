type OpenState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export type { Author } from "./author";
export type { Image } from "./image";
export type { Category } from "./category";
export type { Book } from "./book";
export type { Pdf } from "./pdf";
export type { Review, ReviewRequest, ReviewFilterRequest } from "./review";
export type { Note } from "./note";
export type { OpenState };
