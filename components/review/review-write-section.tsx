import z from "zod/v3";
import ReviewForm from "./form/review-form";
import { ReviewFormSchema } from "@/lib/validations";

export default function ReviewWriteSection() {
  const defaultValues = {
    rating: 0,
    comment: "",
  };

  function handleSubmit(values: z.infer<typeof ReviewFormSchema>) {
    console.log(values);
  }

  return (
    <div>
      <ReviewForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </div>
  );
}
