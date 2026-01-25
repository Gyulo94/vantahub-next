import { Book } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  return (
    <div className="w-45">
      <Link href={`books/${book.id}/${book?.slug}` || "#"}>
        <div className="relative w-45 h-66.5 rounded-md overflow-hidden border shadow-lg">
          <Image
            src={book?.image?.url || ""}
            alt={book?.title || "book cover"}
            fill
            sizes="180px"
            className="object-cover object-center hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      <div>
        <div className="flex items-center w-45 mt-5 h-10">
          <Link
            className="text-[15px] font-bold mb-1.75 line-clamp-2"
            href={`books/${book.id}/${book?.slug}` || "#"}
          >
            {book?.title}
          </Link>
        </div>
        <div className=" w-45 line-clamp-1 text-[13px] text-muted-foreground">
          <span>{book?.author.name}</span>
          <span> • {book?.category.name}</span>
        </div>
      </div>
    </div>
  );
}
