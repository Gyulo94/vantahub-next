import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import AuthorForm from "./form/author-form";
import { useOpenAuthorStore } from "@/lib/stores";
import z from "zod/v3";
import { AuthorFormSchema } from "@/lib/validations";
import { useCreateAuthor } from "@/lib/queries";

export default function CreateAuthorSheet() {
  const { isOpen, onClose } = useOpenAuthorStore();
  const { mutate: createAuthor } = useCreateAuthor();
  const defaultValues: z.infer<typeof AuthorFormSchema> = {
    name: "",
    image: "",
    bio: "",
  };

  function handleSubmit(values: z.infer<typeof AuthorFormSchema>) {
    createAuthor(values, {
      onSuccess() {
        onClose();
      },
      onError() {
        onClose();
      },
    });
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear Author</SheetTitle>
          <SheetDescription>
            Ingresa la información del author.
          </SheetDescription>
        </SheetHeader>
        <AuthorForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
