"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import Loader from "@/components/ui/loader";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useImageUpload } from "@/lib/hooks";
import { AuthorFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon } from "lucide-react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import z from "zod/v3";

interface Props {
  id?: string;
  isDisabled?: boolean;
  onSubmit: (data: z.infer<typeof AuthorFormSchema>) => void;
  defaultValues: z.infer<typeof AuthorFormSchema>;
  onClose?: () => void;
}

export default function AuthorForm({
  id,
  isDisabled,
  onSubmit,
  defaultValues,
  onClose,
}: Props) {
  const form = useForm<z.infer<typeof AuthorFormSchema>>({
    resolver: zodResolver(AuthorFormSchema),
    defaultValues,
  });

  const currentImage = form.watch("image");

  const initialImages = useMemo(() => {
    return currentImage ? [currentImage] : [];
  }, [currentImage]);

  const { uploadImages, uploading } = useImageUpload({
    maxImages: 1,
    initialImages,
    onSuccess: (urls) => {
      if (urls.length > 0) {
        const newImageUrl = urls[0];
        form.setValue("image", newImageUrl);
      }
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: uploadImages,
  });
  return (
    <Form {...form}>
      <form className="p-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-5">
                  {field.value ? (
                    <Avatar
                      className="size-18 relative rounded-md overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                      {...getRootProps()}
                    >
                      <AvatarImage
                        src={field.value}
                        className="object-cover rounded-full"
                        alt="Author Image"
                      />
                      {uploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader />
                        </div>
                      )}
                    </Avatar>
                  ) : (
                    <Avatar
                      className="size-18 cursor-pointer hover:bg-gray-50 transition-colors"
                      {...getRootProps()}
                    >
                      <AvatarFallback>
                        {uploading ? (
                          <Loader className="border-neutral-400 border-t-transparent" />
                        ) : (
                          <ImageIcon className="size-9 text-neutral-400" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className="flex flex-col">
                    <p className="text-sm">
                      {field.value
                        ? "Haga clic para cambiar la imagen."
                        : "Suba la imagen del author."}
                    </p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="sr-only"
                      {...getInputProps()}
                      disabled={uploading}
                    />
                  </div>
                </div>
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Ingrese el nombre del author.`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
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
        </div>
        <Separator className="my-7" />
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
