import z from "zod/v3";
import ReviewForm from "./form/review-form";
import { ReviewFormSchema } from "@/lib/validations";
import { useCreateReview } from "@/lib/queries";

interface Props {
  bookId: number;
}

export default function ReviewWriteSection({ bookId }: Props) {
  const { mutate: createReview } = useCreateReview();
  const defaultValues = {
    rating: 0,
    comment: "",
    bookId,
  };

  function handleSubmit(values: z.infer<typeof ReviewFormSchema>) {
    createReview(values);
  }

  return (
    <div>
      <ReviewForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </div>
  );
}
