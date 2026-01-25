import { Image } from "./image";

export type Author = {
  id: string;
  name: string;
  bio: string;
  image: Image | null;
  createdAt: Date;
  updatedAt: Date;
};
