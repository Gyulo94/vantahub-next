"use client";

import { BookListWithCarousel } from "@/components/book/book-list";
import { useGroupBooksByCategory } from "@/lib/hooks/book";
import { useFindBooksAll } from "@/lib/queries";

export default function FeatureSection() {
  const { data } = useFindBooksAll();
  const books = data?.books || [];
  console.log(data);

  const booksByCategory = useGroupBooksByCategory(books);
  return (
    <>
      {Object.entries(booksByCategory).map(([categoryName, categoryBooks]) => (
        <BookListWithCarousel
          key={categoryName}
          title={categoryName}
          books={categoryBooks}
        />
      ))}
    </>
  );
}
