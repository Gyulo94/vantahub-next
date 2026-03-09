import FeatureSection from "@/components/book/layout/categories/feature-section";
import { getQueryClient } from "@/components/providers/get-query-client";
import { findBooksAll } from "@/lib/actions";

interface Props {
  params: Promise<{
    categoryName: string;
  }>;
  searchParams: Promise<{
    page?: string;
    take?: string;
  }>;
}

export default async function page({ params, searchParams }: Props) {
  const { categoryName } = await params;
  const search = await searchParams;
  const page = search.page ? parseInt(search.page, 10) : 1;
  const take = search.take ? parseInt(search.take, 10) : 8;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["books", { categoryName, page, take }],
    queryFn: () =>
      findBooksAll({
        categoryName,
        page,
        take,
      }),
  });
  return (
    <div className="tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto">
      <FeatureSection categoryName={categoryName} page={page} take={take} />
    </div>
  );
}
