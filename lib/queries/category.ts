import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory,
  deleteManyCategories,
  findCategoriesAll,
  findCategoryById,
  updateCategory,
} from "../actions";
import toast from "react-hot-toast";
import { CategoryFormSchema } from "../validations";
import z from "zod/v3";

export function useCreateCategory() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useFindCategoriesAll() {
  const query = useQuery({
    queryKey: ["categories"],
    queryFn: findCategoriesAll,
  });
  return query;
}

export function useFindCategoryById(id?: string) {
  const query = useQuery({
    queryKey: ["category", { id }],
    queryFn: () => findCategoryById(id),
    enabled: !!id,
  });
  return query;
}

export function useUpdateCategory(id?: string) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values: z.infer<typeof CategoryFormSchema>) =>
      updateCategory(id, values),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useDeleteManyCategories() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (ids: string[]) => deleteManyCategories(ids),
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}
