import CategoryForm from "./form/category-form";
import { useOpenCategoryStore } from "@/lib/stores";
import z from "zod/v3";
import { CategoryFormSchema } from "@/lib/validations";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCreateCategory } from "@/lib/queries";

export default function CreateCategorySheet() {
  const { isOpen, onClose } = useOpenCategoryStore();
  const { mutate: createCategory } = useCreateCategory();

  const defaultValues: z.infer<typeof CategoryFormSchema> = {
    name: "",
  };

  function handleSubmit(values: z.infer<typeof CategoryFormSchema>) {
    createCategory(values, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear Categoría</SheetTitle>
          <SheetDescription>
            Ingresa la información de la categoría.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={defaultValues}
          onSubmit={handleSubmit}
          onClose={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
