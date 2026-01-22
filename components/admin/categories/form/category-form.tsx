import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v3";
import { CategoryFormSchema } from "@/lib/validations";

interface Props {
  defaultValues: z.infer<typeof CategoryFormSchema>;
  onSubmit: (data: z.infer<typeof CategoryFormSchema>) => void;
  onClose: () => void;
  id?: string;
}

export default function CategoryForm({
  id,
  onSubmit,
  defaultValues,
  onClose,
}: Props) {
  const form = useForm<z.infer<typeof CategoryFormSchema>>({
    resolver: zodResolver(CategoryFormSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <form className="space-y-8 p-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="entra el nombre de la categoría"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row justify-end items-center gap-4 mt-10">
          <Button
            type="button"
            variant={"outline"}
            className="w-20"
            onClick={onClose}
          >
            Cerrar
          </Button>
          <Button type="submit" className="w-20">
            {id ? "Editar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
