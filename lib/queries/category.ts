import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, findCategoriesAll } from "../actions";
import toast from "react-hot-toast";

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
