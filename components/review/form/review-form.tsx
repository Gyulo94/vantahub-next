"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReviewFormSchema } from "@/lib/validations";
import z from "zod/v3";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BookRating from "@/components/ui/book-rating";

interface Props {
  id?: string;
  defaultValues: Partial<z.infer<typeof ReviewFormSchema>>;
  onSubmit: (data: z.infer<typeof ReviewFormSchema>) => void;
}

export default function ReviewForm({ id, defaultValues, onSubmit }: Props) {
  const form = useForm<z.infer<typeof ReviewFormSchema>>({
    resolver: zodResolver(ReviewFormSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
      <Card className="mb-5 py-2">
        <form
          onSubmit={form.handleSubmit((values) => {
            values.bookId =
              defaultValues.bookId !== undefined ? defaultValues.bookId : 0;
            onSubmit(values);
          })}
          className="space-y-4 p-4"
        >
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Ingrese su reseña aquí"
                    {...field}
                    className="min-h-30 resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-between items-center">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <BookRating
                      className="w-37.5"
                      labelHidden
                      {...field}
                      value={Number(field.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {id ? "Actualizar Reseña" : "Enviar Reseña"}
            </Button>
          </div>
        </form>
      </Card>
    </Form>
  );
}
