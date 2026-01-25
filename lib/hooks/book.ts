import { Book } from "../types";

export function useGenerateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "-")
    .replace(/[\s_]+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function useGroupBooksByCategory(books: Book[]): Record<string, Book[]> {
  return books.reduce(
    (acc, book) => {
      const categoryName = book.category.name;
      (acc[categoryName] = acc[categoryName] || []).push(book);
      return acc;
    },
    {} as Record<string, Book[]>,
  );
}
