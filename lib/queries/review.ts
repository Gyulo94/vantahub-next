import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Review, ReviewFilterRequest } from "../types";
import { checkReviewExists, createReview, findReviewsAll } from "../actions";
import toast from "react-hot-toast";

export function useFindReviewsAll(request: ReviewFilterRequest) {
  const query = useQuery<Review[]>({
    queryKey: ["reviews", { filter: request }],
    queryFn: () => findReviewsAll(request),
    enabled: !!request,
  });
  return query;
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.setQueryData(
        ["review", "exists", { bookId: data.body.book.id }],
        true,
      );
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
      queryClient.invalidateQueries({
        queryKey: ["review", { id: data.body.id }],
      });
      queryClient.invalidateQueries({
        queryKey: ["book", { id: data.body.book.id }],
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
  return mutation;
}

export function useCheckReviewExists(bookId: number) {
  const query = useQuery<Boolean>({
    queryKey: ["review", "exists", { bookId }],
    queryFn: async () => {
      const response = await checkReviewExists(bookId);
      return response;
    },
  });
  return query;
}
