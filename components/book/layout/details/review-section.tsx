"use client";

import ReviewList from "@/components/review/review-list";
import ReviewWriteSection from "@/components/review/review-write-section";
import { useFindBookById, useFindReviewsAll } from "@/lib/queries";

interface Props {
  id: number;
}

export default function ReviewSection({ id }: Props) {
  const { data: book } = useFindBookById(id);
  const { data: reviews } = useFindReviewsAll({ bookId: id });
  return (
    <div className="tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reseñas del {book?.title}</h2>
      <ReviewWriteSection />
      <ReviewList reviews={reviews} />
    </div>
  );
}
