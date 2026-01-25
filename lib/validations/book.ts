import z from "zod/v3";

export const BookFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Por favor, ingrese el título del libro." })
    .max(100, {
      message: "El título del libro no puede exceder los 100 caracteres.",
    })
    .trim(),
  image: z
    .string()
    .url({ message: "Por favor, ingrese una URL válida para la imagen." }),
  authorId: z
    .string()
    .uuid({ message: "Por favor, seleccione un autor válido." }),
  description: z
    .string()
    .max(1000, {
      message: "La descripción del libro no puede exceder los 1000 caracteres.",
    })
    .optional(),
  categoryId: z
    .string()
    .uuid({ message: "Por favor, seleccione una categoría válida." }),
  publishedAt: z.date({
    invalid_type_error: "Por favor, ingrese una fecha de publicación válida.",
  }),
  pdf: z
    .string()
    .url({ message: "Por favor, ingrese una URL válida para el PDF." }),
  slug: z
    .string()
    .min(1, { message: "Por favor, ingrese el slug del libro." })
    .max(100, {
      message: "El slug del libro no puede exceder los 100 caracteres.",
    })
    .trim(),
});
