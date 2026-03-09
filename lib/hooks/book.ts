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

export function useCategoryRegex(categoryName: string) {
  let reg = /[`~!@#$%^&*()_|+\-=?;:'"<>\{\}\[\]\\\/]/gim;
  let spaceOnly = / /gim;
  return new RegExp(
    categoryName.toLowerCase().trim().replace(reg, "-").replace(spaceOnly, ""),
  );
}

export function useFormatCategoryName(categoryName: string) {
  let name;
  if (categoryName.includes("-")) {
    name = categoryName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("-");
    return decodeURIComponent(name.trim().replace("-", " / "));
  } else {
    name = decodeURIComponent(
      categoryName.charAt(0).toUpperCase() + categoryName.slice(1),
    );
    return decodeURIComponent(name.trim());
  }
}
