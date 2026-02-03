import z from "zod/v3";

export const ReviewFormSchema = z.object({
  rating: z
    .number({
      required_error: "La calificación es requerida",
    })
    .min(1, { message: "La calificación debe ser al menos 1" })
    .max(5, { message: "La calificación debe ser como máximo 5" }),
  comment: z
    .string({ required_error: "El comentario es requerido" })
    .min(10, { message: "El comentario debe tener al menos 10 caracteres" })
    .max(1000, {
      message: "El comentario debe tener como máximo 1000 caracteres",
    }),
});
