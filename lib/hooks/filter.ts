import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function useBookFilter() {
  return useQueryStates({
    category: parseAsString,
    page: parseAsInteger,
  });
}
