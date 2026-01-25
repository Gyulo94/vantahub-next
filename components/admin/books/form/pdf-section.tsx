import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { usePdfUpload } from "@/lib/hooks";
import { extractFileName } from "@/lib/hooks";
import { BookFormSchema } from "@/lib/validations";
import { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UseFormReturn } from "react-hook-form";
import z from "zod/v3";

interface Props {
  form: UseFormReturn<z.infer<typeof BookFormSchema>>;
}

export default function PdfSection({ form }: Props) {
  const currentPdf = form.watch("pdf");
  const [fileName, setFileName] = useState("");

  const initialPdfs = useMemo(() => {
    return currentPdf ? [currentPdf] : [];
  }, [currentPdf]);

  const initialNames = useMemo(() => {
    if (fileName) return [fileName];
    const parsed = extractFileName(currentPdf);
    return parsed ? [parsed] : [];
  }, [currentPdf, fileName]);

  const { uploadPdfs, uploading } = usePdfUpload({
    initialPdfs,
    initialNames,
    onSuccess: (newPdfUrls, newNames) => {
      form.setValue("pdf", newPdfUrls[0]);
      setFileName(newNames[0] || "");
    },
  });
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: uploadPdfs,
    accept: { "application/pdf": [".pdf"] },
  });
  return (
    <FormField
      control={form.control}
      name="pdf"
      render={({ field }) => (
        <FormItem>
          <FormLabel>PDF</FormLabel>
          <FormControl>
            <div
              className="flex items-center justify-between rounded-md border px-3 py-2 hover:bg-accent cursor-pointer"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col text-sm flex-1 pr-3">
                <span className="font-medium">
                  {field.value ? "" : "Subir PDF"}
                </span>
                {field.value && (
                  <span className="text-xs text-muted-foreground break-all">
                    {fileName || extractFileName(field.value)}
                  </span>
                )}
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={uploading}
              >
                {uploading ? "Subiendo..." : "Elegir"}
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
