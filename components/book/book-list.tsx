import BookItem from "@/components/book/book-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Book } from "@/lib/types";
import { PaginationWithLinks } from "../ui/pagination-with-links";

interface BookListWithCarouselProps {
  books: Book[];
  title?: string;
}

export function BookListWithCarousel({
  books,
  title,
}: BookListWithCarouselProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-2xl font-semibold">{title || ""}</h2>
      </div>
      <Carousel
        className="w-full hidden tablet:block"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent className="tablet:ml-4.5 desktop:ml-3">
          {books.map((book) => (
            <CarouselItem
              key={book.id}
              className="pl-4 w-full tablet:basis-1/3 laptop:basis-1/4 desktop:basis-1/6"
            >
              <BookItem book={book} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

interface BookListProps {
  books: Book[];
  title: string;
  page: number;
  take: number;
  totalCount: number;
}

export default function BookList({
  books,
  title,
  page,
  take,
  totalCount,
}: BookListProps) {
  return (
    <section className="mb-10">
      <div className="flex items-center justify-between pb-5">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="grid grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-4">
        {books.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 pt-20">
            No hay libros en esta categoría
          </p>
        ) : (
          books.map((book) => <BookItem key={book.id} book={book} />)
        )}
      </div>
      <div className="mt-5">
        <PaginationWithLinks
          page={page || 1}
          take={take}
          totalCount={totalCount}
        />
      </div>
    </section>
  );
}
