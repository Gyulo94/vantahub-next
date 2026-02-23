import { getQueryClient } from "@/components/providers/get-query-client";
import { findBookById, findNotesByBookId } from "@/lib/actions";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { notFound, redirect } from "next/navigation";
import FeatureSection from "./feature-section";

interface Props {
  params: Promise<{
    id: string;
    slug: string;
  }>;
}

export default async function BookReadingPage({ params }: Props) {
  const { id, slug } = await params;
  const bookId = Number(id);
  const book = await findBookById(bookId);
  if (!id || !slug || !book) {
    return notFound();
  }

  if (book.slug !== slug) {
    return redirect(`/books/${book.id}/${book.slug}/read`);
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["book", { id: bookId }],
    queryFn: () => findBookById(bookId),
  });
  await queryClient.prefetchQuery({
    queryKey: ["notes", { bookId }],
    queryFn: () => findNotesByBookId(bookId),
  });
  const state = dehydrate(queryClient);
  return (
    <div className="w-full min-h-screen">
      <HydrationBoundary state={state}>
        <FeatureSection id={bookId} />
      </HydrationBoundary>
    </div>
  );
}
