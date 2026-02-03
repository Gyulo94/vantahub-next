import { findBooksAll } from "@/lib/actions";
import FeatureSection from "@/components/home/layout/feature-section";
import { getQueryClient } from "@/components/providers/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["books"],
    queryFn: findBooksAll,
  });

  const state = dehydrate(queryClient);
  return (
    <main className="space-y-10 tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto">
      <HydrationBoundary state={state}>
        <FeatureSection />
      </HydrationBoundary>
    </main>
  );
}
