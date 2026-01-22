import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AuthorForm from "./form/author-form";
import { useEditAuthorStore } from "@/lib/stores";
import z from "zod/v3";
import { AuthorFormSchema } from "@/lib/validations";
import { useFindAuthorById, useUpdateAuthor } from "@/lib/queries";

export default function EditAuthorSheet() {
  const { id, isOpen, onClose } = useEditAuthorStore();
  const { data } = useFindAuthorById(id);
  const { mutate: updateAuthor } = useUpdateAuthor(id);

  if (!data) {
    return null;
  }

  const defaultValues: z.infer<typeof AuthorFormSchema> = {
    name: data.name ?? "",
    image: data.image.url ?? "",
    bio: data.bio ?? "",
  };

  function handleSubmit(values: z.infer<typeof AuthorFormSchema>) {
    updateAuthor(values, {
      onSuccess() {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Author</SheetTitle>
          <SheetDescription>
            Ingresa la información del author.
          </SheetDescription>
        </SheetHeader>
        <AuthorForm
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
