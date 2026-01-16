import { z } from "zod/v3";

export const AuthorFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  image: z.string().url().optional(),
});
