import CategoryForm from "./form/category-form";
import { useEditCategoryStore } from "@/lib/stores";
import z from "zod/v3";
import { CategoryFormSchema } from "@/lib/validations";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useFindCategoryById, useUpdateCategory } from "@/lib/queries";

export default function EditCategorySheet() {
  const { isOpen, onClose, id } = useEditCategoryStore();
  const { data } = useFindCategoryById(id);
  const { mutate: createCategory } = useUpdateCategory(id);

  const defaultValues: z.infer<typeof CategoryFormSchema> = {
    name: data?.name ?? "",
  };

  if (!data) {
    return null;
  }

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
          <SheetTitle>Editar Categoría</SheetTitle>
          <SheetDescription>
            Ingresa la información de la categoría.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
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
