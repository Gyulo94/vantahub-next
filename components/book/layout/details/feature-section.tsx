"use client";

import { useFindBookById } from "@/lib/queries";

interface Props {
  id: number;
}

export default function FeatureSection({ id }: Props) {
  const { data: book } = useFindBookById(id);
  return (
    <div className="tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto">
      <div className="prose prose-lg mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">
          Introduccion del {book?.title}
        </h2>
        <p className="text-lg font-semibold text-muted-foreground min-h-25 bg-secondary/50 p-6 rounded-2xl">
          {book?.description ? book.description : "no descripción disponible."}
        </p>
      </div>

      <div className="prose prose-lg mx-auto py-8">
        <h2 className="text-2xl font-semibold mb-4">Autor del {book?.title}</h2>
        <p className="text-lg font-semibold text-muted-foreground min-h-25 bg-secondary/50 p-6 rounded-2xl">
          {book?.author.bio ? book.author.bio : "no biografía disponible."}
        </p>
      </div>
    </div>
  );
}
