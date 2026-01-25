import { FormField } from "@/components/ui/form";
import { useImageUpload } from "@/lib/hooks";
import { BookFormSchema } from "@/lib/validations";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod/v3";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Loader from "@/components/ui/loader";

interface Props {
  form: UseFormReturn<z.infer<typeof BookFormSchema>>;
}

export default function BookCoverSection({ form }: Props) {
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
    accept: { "image/*": [] },
    multiple: false,
  });

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <div className="flex flex-col gap-y-2">
          <div className="flex items-center justify-center tablet:justify-start">
            {field.value ? (
              <div
                className="relative w-42.5 h-55 border rounded-md overflow-hidden cursor-pointer aspect-2/1 transition-colors"
                {...getRootProps()}
              >
                <Image
                  fill
                  src={field.value}
                  className="object-cover rounded-md focus-visible:outline-0"
                  alt="Book Image"
                />
                {uploading && (
                  <div className="absolute inset-0 bg-secondary dark:bg-accent/50 hover:bg-secondary/80 dark:hover:bg-accent/80 flex items-center justify-center">
                    <Loader />
                  </div>
                )}
              </div>
            ) : (
              <div
                className="relative w-42.5 h-55 rounded-md overflow-hidden border cursor-pointer aspect-2/1 transition-colors"
                {...getRootProps()}
              >
                <div className="absolute inset-0 bg-secondary dark:bg-accent/50 hover:bg-secondary/80 dark:hover:bg-accent/80 flex items-center justify-center">
                  {uploading ? (
                    <Loader className="border-neutral-400 border-t-transparent" />
                  ) : (
                    <ImageIcon className="size-9 text-neutral-400" />
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col">
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
  );
}
