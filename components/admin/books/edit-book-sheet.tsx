import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEditBookStore } from "@/lib/stores";
import z from "zod/v3";
import { BookFormSchema } from "@/lib/validations";
import { useFindBookById, useUpdateBook } from "@/lib/queries";
import BookForm from "./form/book-form";

export default function EditBookSheet() {
  const { id, isOpen, onClose } = useEditBookStore();
  const { data } = useFindBookById(id);
  const { mutate: updateBook } = useUpdateBook(id);

  if (!data) {
    return null;
  }
  console.log(data);

  const defaultValues: z.infer<typeof BookFormSchema> = {
    title: data.title || "",
    description: data.description || "",
    authorId: data.author.id || "",
    image: data.image?.url || "",
    categoryId: data.category.id || "",
    publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
    pdf: data.pdf?.url || "",
    slug: data.slug || "",
  };

  function handleSubmit(values: z.infer<typeof BookFormSchema>) {
    updateBook(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-xl!">
        <SheetHeader>
          <SheetTitle>Editar Libro</SheetTitle>
          <SheetDescription>Ingresa la información del libro.</SheetDescription>
        </SheetHeader>
        <BookForm
          key={id}
          id={id}
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
