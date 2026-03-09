import TopSection from "./layout/top-section";
import BottomSection from "./layout/bottom-section";
import { getQueryClient } from "@/components/providers/get-query-client";
import { findCategoriesAll } from "@/lib/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function Navbar() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["categories"],
    queryFn: findCategoriesAll,
  });
  const state = dehydrate(queryClient);
  return (
    <header className="w-full flex flex-col border backdrop-blur-xs">
      <nav className="w-full laptop:max-w-4xl desktop:max-w-7xl flex flex-col px-4 laptop:px-0 py-2 mx-auto">
        <TopSection />
        <HydrationBoundary state={state}>
          <BottomSection />
        </HydrationBoundary>
      </nav>
    </header>
  );
}
