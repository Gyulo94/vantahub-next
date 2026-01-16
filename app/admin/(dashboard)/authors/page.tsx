import { getQueryClient } from "@/components/providers/get-query-client";
import TopSection from "@/components/admin/author/layout/top-section";
import { findAuthorsAll } from "@/lib/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FeatureSection from "@/components/admin/author/layout/feature-section";

export default async function AuthorsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["authors"],
    queryFn: findAuthorsAll,
  });

  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <TopSection />
      <FeatureSection />
    </HydrationBoundary>
  );
}
