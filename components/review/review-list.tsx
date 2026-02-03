"use client";

import { Card, CardContent } from "../ui/card";
import ReviewCard from "./review-card";
import { Review } from "@/lib/types";

interface Props {
  reviews?: Review[];
}

export default function ReviewList({ reviews }: Props) {
  return (
    <div className="flex flex-col">
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <Card className="mb-5">
          <CardContent>
            <p className="text-lg font-semibold text-muted-foreground">
              No hay reseñas disponibles.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
