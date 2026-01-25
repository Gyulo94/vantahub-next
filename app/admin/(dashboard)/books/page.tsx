import { getQueryClient } from "@/components/providers/get-query-client";
import TopSection from "@/components/admin/books/layout/top-section";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FeatureSection from "@/components/admin/books/layout/feature-section";
import { findBooksAll } from "@/lib/actions";

export default async function BooksPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: findBooksAll,
  });

  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <TopSection />
      <FeatureSection />
    </HydrationBoundary>
  );
}
