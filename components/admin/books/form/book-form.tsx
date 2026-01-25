import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import UserAvatar from "@/components/ui/user-avatar";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useFindAuthorsAll, useFindCategoriesAll } from "@/lib/queries";
import { Author, Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BookFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { useGenerateSlug } from "@/lib/hooks/book";
import PdfSection from "./pdf-section";
import BookCoverSection from "./book-cover-section";

interface Props {
  id?: number;
  isDisabled?: boolean;
  defaultValues: z.infer<typeof BookFormSchema>;
  onSubmit: (data: z.infer<typeof BookFormSchema>) => void;
  onClose?: () => void;
}

export default function BookForm({
  id,
  isDisabled,
  defaultValues,
  onSubmit,
  onClose,
}: Props) {
  const [publishedAtOpen, setPublishedAtOpen] = useState(false);
  const { data: authors } = useFindAuthorsAll();
  const { data: categories } = useFindCategoriesAll();
  const form = useForm<z.infer<typeof BookFormSchema>>({
    resolver: zodResolver(BookFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
          <BookCoverSection form={form} />
          <div className="col-span-2 space-y-4">
            <PdfSection form={form} />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione una categoría" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {!categories ? (
                        <SelectItem disabled value="no-category">
                          No categories available
                        </SelectItem>
                      ) : (
                        categories?.map((category: Category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id}
                            className="h-12"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`size-4 rounded-full`} />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un autor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent position="popper">
                      {!authors ? (
                        <SelectItem disabled value="no-author">
                          No authors available
                        </SelectItem>
                      ) : (
                        authors?.map((author: Author) => (
                          <SelectItem
                            key={author.id}
                            value={author.id}
                            className="h-12"
                          >
                            <div className="flex items-center gap-2">
                              <UserAvatar
                                name={author.name}
                                url={author.image?.url || DEFAULT_AVATAR}
                                className="size-6"
                              />
                              <span>{author.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título del Libro</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ingrese el título del libro"
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    form.setValue("slug", useGenerateSlug(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ingrese la descripción del libro"
                  className="resize-none min-h-25 max-h-60"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publishedAt"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de publicación</FormLabel>
              <Popover
                modal={true}
                open={publishedAtOpen}
                onOpenChange={setPublishedAtOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: es })
                      ) : (
                        <span>Seleccione la fecha de inicio</span>
                      )}
                      <CalendarIcon className="ml-auto size-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    defaultMonth={field.value}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      field.onChange(date);
                      setPublishedAtOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant={"secondary"}
            size={"md"}
            onClick={onClose}
            disabled={isDisabled}
          >
            Cancelar
          </Button>
          <Button type="submit" size={"md"} disabled={isDisabled}>
            {id ? "Editar" : "Crear"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
