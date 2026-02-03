import { findBookById } from "@/lib/actions";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookIdPage({ params }: Props) {
  const { id } = await params;
  const bookId = Number(id);
  const book = await findBookById(bookId);
  if (book) {
    return redirect(`/books/${book.id}/${book.slug}`);
  } else {
    return notFound();
  }
}
