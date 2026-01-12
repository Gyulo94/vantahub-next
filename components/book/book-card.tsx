import Image from "next/image";
import Link from "next/link";

interface Props {
  book?: {
    id: number;
    title: string;
    href: string;
    category: string;
    author: string;
    image: string;
  };
}

export default function BookCard({ book }: Props) {
  return (
    <div className="w-45">
      <Link href={book?.href || "#"}>
        <div className="relative w-45 h-66.5 rounded-md overflow-hidden border shadow-lg">
          <Image
            src={book?.image || ""}
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
            href={book?.href || "#"}
          >
            {book?.title}
          </Link>
        </div>
        <div className=" w-45 line-clamp-1 text-[13px] text-muted-foreground">
          <span>{book?.author}</span>
          <span> • {book?.category}</span>
        </div>
      </div>
    </div>
  );
}
