"use client";

import BookList from "@/components/book/book-list";
import { useGroupBooksByCategory } from "@/lib/hooks/book";
import { useFindBooksAll } from "@/lib/queries";

export default function FeatureSection() {
  const { data } = useFindBooksAll();
  const books = data || [];
  const booksByCategory = useGroupBooksByCategory(books);
  return (
    <>
      {Object.entries(booksByCategory).map(([categoryName, categoryBooks]) => (
        <BookList
          key={categoryName}
          title={categoryName}
          books={categoryBooks}
        />
      ))}
    </>
  );
}
