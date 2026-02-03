import { Review } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import UserAvatar from "../ui/user-avatar";
import BookRating from "../ui/book-rating";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { Edit, Trash2 } from "lucide-react";
import { DEFAULT_AVATAR } from "@/lib/constants";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  const { data: session } = useSession();
  return (
    <Card className="mb-5">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <UserAvatar
              name={review.user.name ?? "Usuario"}
              url={review.user.image ?? DEFAULT_AVATAR}
              size="2xl"
              isTooltipEnabled={false}
            />
            <div className="flex flex-col">
              <CardTitle className="text-lg">{review.user.name}</CardTitle>
              <div className="flex items-center gap-3">
                <BookRating
                  className="w-25.5"
                  readOnly
                  value={review.rating}
                  labelHidden
                />
                <p className="text-muted-foreground">
                  {format(new Date(review.createdAt), "PPP", { locale: es })}
                </p>
              </div>

              <p className="text-muted-foreground">
                Libro: {review.book.title}
              </p>
            </div>
          </div>
          {session?.user.id === review.user.id && (
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                className="text-muted-foreground hover:text-white"
              >
                <Edit />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/20!"
              >
                <Trash2 />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p>{review.comment}</p>
      </CardContent>
    </Card>
  );
}
