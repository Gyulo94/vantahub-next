import z from "zod/v3";

export const CategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Por favor, ingrese el nombre de la categoría." })
    .max(100, {
      message: "El nombre de la categoría no puede exceder los 100 caracteres.",
    })
    .trim(),
});
