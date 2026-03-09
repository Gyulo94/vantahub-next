"use client";

import { useFindBooksAll } from "@/lib/queries";
import BookList from "../../book-list";
import { useFormatCategoryName } from "@/lib/hooks/book";
import { Book } from "@/lib/types";

interface Props {
  categoryName: string;
  page: number;
  take: number;
}

export default function FeatureSection({ categoryName, page, take }: Props) {
  const { data } = useFindBooksAll({
    categoryName,
    page: page ?? 1,
    take: take ?? 8,
  });
  const books: Book[] = data?.books || [];
  console.log("totalCount ", data?.totalCount);

  let title = useFormatCategoryName(categoryName);
  return (
    <div className="mt-2 min-h-[calc(100vh-130px-8px)]">
      {
        <BookList
          books={books}
          title={title}
          page={page}
          take={take}
          totalCount={data?.totalCount}
        />
      }
    </div>
  );
}
