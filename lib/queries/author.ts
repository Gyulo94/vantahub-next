import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAuthor, findAuthorsAll } from "../actions";
import toast from "react-hot-toast";

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
