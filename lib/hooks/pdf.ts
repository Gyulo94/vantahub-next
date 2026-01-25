import toast from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { pdfUpload } from "../actions";

interface Props {
  maxPdfs?: number;
  onSuccess?: (urls: string[], names: string[]) => void;
  initialPdfs?: string[];
  initialNames?: string[];
}

export function usePdfUpload({
  maxPdfs = 1,
  onSuccess,
  initialPdfs = [],
  initialNames = [],
}: Props = {}) {
  const [pdfs, setPdfs] = useState<string[]>(initialPdfs);
  const [names, setNames] = useState<string[]>(initialNames);
  const [uploading, setUploading] = useState(false);
  const prevInitialPdfsRef = useRef<string[]>(initialPdfs);

  useEffect(() => {
    const currentInitialPdfs = initialPdfs;
    const prevInitialPdfs = prevInitialPdfsRef.current;

    const hasChanged =
      currentInitialPdfs.length !== prevInitialPdfs.length ||
      currentInitialPdfs.some((pdf, index) => pdf !== prevInitialPdfs[index]);

    if (hasChanged) {
      setPdfs(currentInitialPdfs);
      setNames(initialNames);
      prevInitialPdfsRef.current = currentInitialPdfs;
    }
  }, [initialPdfs, initialNames]);

  const uploadPdfs = useCallback(
    async (acceptedFiles: File[]) => {
      const remainingSlots = maxPdfs - pdfs.length;
      const filesToUpload = acceptedFiles.slice(0, maxPdfs);
      if (filesToUpload.length === 0) {
        toast.error("Elegir un archivo PDF para subir.");
        return;
      }
      setUploading(true);

      try {
        const formData = new FormData();
        const fileNames: string[] = [];

        filesToUpload.forEach((file) => {
          formData.append("files", file);
          fileNames.push(file.name);
        });

        const uploadedUrls = await pdfUpload(formData);

        if (uploadedUrls && uploadedUrls.length > 0) {
          let newPdfs: string[];
          let newNames: string[];

          if (remainingSlots <= 0) {
            newPdfs = uploadedUrls.slice(0, maxPdfs);
            newNames = fileNames.slice(0, maxPdfs);
          } else {
            const totalPdfs = [...pdfs, ...uploadedUrls];
            const totalNames = [...names, ...fileNames];
            newPdfs = totalPdfs.slice(0, maxPdfs);
            newNames = totalNames.slice(0, maxPdfs);
          }

          setPdfs(newPdfs);
          setNames(newNames);
          onSuccess?.(newPdfs, newNames);
        }
      } catch (error) {
        toast.error("Error al subir el PDF.");
      } finally {
        setUploading(false);
      }
    },
    [pdfs, names, maxPdfs, onSuccess],
  );

  return {
    uploading,
    uploadPdfs,
    names,
  };
}

export function extractFileName(url: string | null | undefined) {
  if (!url) return "";
  const pathPart = url.split("?")[0];
  const parts = pathPart.split("/");
  return parts[parts.length - 1] || "";
}
