import { getQueryClient } from "@/components/providers/get-query-client";
import TopSection from "@/components/admin/categories/layout/top-section";
import { findCategoriesAll } from "@/lib/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FeatureSection from "@/components/admin/categories/layout/feature-section";

export default async function CategoriesPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: findCategoriesAll,
  });

  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <TopSection />
      <FeatureSection />
    </HydrationBoundary>
  );
}
