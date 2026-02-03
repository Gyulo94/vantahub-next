import { useQuery } from "@tanstack/react-query";
import { Review, ReviewRequest } from "../types";
import { findReviewsAll } from "../actions";

export function useFindReviewsAll(request: ReviewRequest) {
  const query = useQuery<Review[]>({
    queryKey: ["reviews", { filter: request }],
    queryFn: () => findReviewsAll(request),
    enabled: !!request,
  });
  return query;
}
