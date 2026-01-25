import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createBook,
  deleteManyBooks,
  findBookById,
  findBooksAll,
  updateBook,
} from "../actions";
import toast from "react-hot-toast";
import { BookFormSchema } from "../validations";
import z from "zod/v3";
import { Book } from "../types";

export function useCreateBook() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBook,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindBooksAll() {
  const query = useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: findBooksAll,
  });
  return query;
}

export function useFindBookById(id?: number) {
  const query = useQuery<Book>({
    queryKey: ["book", { id }],
    queryFn: () => findBookById(id),
    enabled: !!id,
  });
  return query;
}

export function useUpdateBook(id?: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof BookFormSchema>) =>
      updateBook(id, values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteManyBooks() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: number[]) => deleteManyBooks(ids),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
