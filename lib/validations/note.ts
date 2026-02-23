import z from "zod/v3";

export const NoteFormSchema = z.object({
  content: z.string().min(1, "se requiere el contenido de la nota").trim(),
  bookId: z.number().min(1, "se requiere el id del libro"),
  pageIndex: z
    .number()
    .min(0, "el índice de página debe ser un número no negativo"),
  quote: z.string().min(1, "se requiere la cita de la nota").trim(),
  highlightAreas: z.array(
    z.object({
      height: z.number().min(0, "la altura debe ser un número no negativo"),
      left: z
        .number()
        .min(0, "la posición izquierda debe ser un número no negativo"),
      pageIndex: z
        .number()
        .min(0, "el índice de página debe ser un número no negativo"),
      top: z
        .number()
        .min(0, "la posición superior debe ser un número no negativo"),
      width: z.number().min(0, "el ancho debe ser un número no negativo"),
    }),
  ),
});
