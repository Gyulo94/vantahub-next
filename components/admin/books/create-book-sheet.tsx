import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BookForm from "./form/book-form";
import { useOpenBookStore } from "@/lib/stores";
import z from "zod/v3";
import { BookFormSchema } from "@/lib/validations";
import { useCreateBook } from "@/lib/queries";

export default function CreateBookSheet() {
  const { isOpen, onClose } = useOpenBookStore();
  const { mutate: createBook } = useCreateBook();
  const defaultValues: z.infer<typeof BookFormSchema> = {
    title: "",
    description: "",
    authorId: "",
    image: "",
    categoryId: "",
    publishedAt: new Date(),
    pdf: "",
    slug: "",
  };

  function handleSubmit(values: z.infer<typeof BookFormSchema>) {
    createBook(values, {
      onSuccess() {
        onClose();
      },
    });
    // console.log(values);
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="max-w-xl!">
        <SheetHeader>
          <SheetTitle>Crear Libro</SheetTitle>
          <SheetDescription>Ingresa la información del libro.</SheetDescription>
        </SheetHeader>
        <BookForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
