import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAuthor,
  deleteManyAuthors,
  findAuthorById,
  findAuthorsAll,
  updateAuthor,
} from "../actions";
import toast from "react-hot-toast";
import { AuthorFormSchema } from "../validations";
import z from "zod/v3";

export function useCreateAuthor() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createAuthor,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindAuthorsAll() {
  const query = useQuery({
    queryKey: ["authors"],
    queryFn: findAuthorsAll,
  });
  return query;
}

export function useFindAuthorById(id?: string) {
  const query = useQuery({
    queryKey: ["author", { id }],
    queryFn: () => findAuthorById(id),
    enabled: !!id,
  });
  return query;
}

export function useUpdateAuthor(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof AuthorFormSchema>) =>
      updateAuthor(id, values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authors"] });
      queryClient.invalidateQueries({ queryKey: ["author", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteManyAuthors() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => deleteManyAuthors(ids),
    onSuccess: (data, ids) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
