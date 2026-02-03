import FeatureSection from "@/components/book/layout/details/feature-section";
import HeaderSection from "@/components/book/layout/details/header-section";
import ReviewSection from "@/components/book/layout/details/review-section";
import { getQueryClient } from "@/components/providers/get-query-client";
import { findBookById, findReviewsAll } from "@/lib/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function BookDetailPage({ params }: Props) {
  const { id, slug } = await params;
  const bookId = Number(id);
  const book = await findBookById(bookId);
  if (!id || !slug || !book) {
    return notFound();
  }

  if (book.slug !== slug) {
    return redirect(`/books/${book.id}/${book.slug}`);
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["book", { id: bookId }],
    queryFn: () => findBookById(bookId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["reviews", { filter: { bookId } }],
    queryFn: async () => findReviewsAll({ bookId }),
  });

  const state = dehydrate(queryClient);

  return (
    <HydrationBoundary state={state}>
      <HeaderSection id={bookId} />
      <FeatureSection id={bookId} />
      <ReviewSection id={bookId} />
    </HydrationBoundary>
  );
}
