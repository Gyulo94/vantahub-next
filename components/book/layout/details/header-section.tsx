"use client";

import { Button } from "@/components/ui/button";
import { useFindBookById } from "@/lib/queries";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Image from "next/image";

interface Props {
  id: number;
}

export default function HeaderSection({ id }: Props) {
  const { data: book } = useFindBookById(id);
  return (
    <div className="bg-secondary p-8">
      <div className="tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto">
        <div className="flex gap-12 mb-6">
          <div className="relative w-58 h-82.75 rounded-md overflow-hidden shrink-0 border shadow-md">
            <Image
              src={book?.image?.url ?? ""}
              alt={book?.title ?? ""}
              fill
              className="object-cover"
            />
          </div>
          <div className="w-full">
            <h1 className="text-3xl font-semibold">{book?.title}</h1>
            <div className="w-full border-b border-black py-1 mb-4" />
            <table className="text-sm">
              <tbody>
                <tr>
                  <td className="font-semibold pr-4 py-2 align-top text-lg">
                    Autor:
                  </td>
                  <td className="py-2 text-lg">{book?.author.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 align-top text-lg">
                    Categoria:
                  </td>
                  <td className="py-2 text-lg">{book?.category.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 align-top text-lg">
                    Publicado:
                  </td>
                  <td className="py-2 text-lg">
                    {format(new Date(book?.publishedAt ?? ""), "PPP", {
                      locale: es,
                    })}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 align-top text-lg">
                    Recomendado por
                  </td>
                  <td className="py-2 text-lg">{book?.recommendedBy ?? 0}</td>
                </tr>
                <tr>
                  <td className="font-semibold pr-4 py-2 align-top text-lg">
                    Páginas:
                  </td>
                  <td className="py-2 text-lg">{book?.totalPages ?? 0}</td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-4 mt-2">
              <Button variant={"default"} className="w-full max-w-45 text-lg">
                Leer
              </Button>
              <Button variant={"outline"} className="w-full max-w-45 text-lg">
                Agregar a favoritos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
