"use client";

import ReviewList from "@/components/review/review-list";
import ReviewWriteSection from "@/components/review/review-write-section";
import {
  useCheckReviewExists,
  useFindBookById,
  useFindReviewsAll,
} from "@/lib/queries";
import { useSession } from "next-auth/react";

interface Props {
  id: number;
}

export default function ReviewSection({ id }: Props) {
  const { data: book } = useFindBookById(id);
  const { data: reviews } = useFindReviewsAll({ bookId: id });
  const { data: reviewExists } = useCheckReviewExists(id);
  const { status } = useSession();

  return (
    <div className="tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Reseñas del {book?.title} ({book?.reviewCount.toLocaleString() ?? 0})
      </h2>
      {status === "authenticated" ? (
        reviewExists ? (
          <p className="text-lg font-semibold text-muted-foreground min-h-20 bg-secondary/50 p-6 rounded-2xl mb-5">
            La Reseña ya existe
          </p>
        ) : (
          <ReviewWriteSection bookId={id} />
        )
      ) : null}
      <ReviewList reviews={reviews} />
    </div>
  );
}
