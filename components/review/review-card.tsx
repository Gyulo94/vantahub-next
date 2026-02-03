import { Review } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import UserAvatar from "../ui/user-avatar";

interface Props {
  review: Review;
}

export default function ReviewCard({ review }: Props) {
  return (
    <Card className="mb-5">
      <div>
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserAvatar
              name={review.user.name ?? "Usuario"}
              url={review.user.image ?? ""}
              size="lg"
              isTooltipEnabled={false}
            />
            <CardTitle className="text-xl">{review.user.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>{review.comment}</p>
        </CardContent>
      </div>
    </Card>
  );
}
