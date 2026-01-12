import BookItem from "@/components/book/book-card";
import { BOOK_ITEMS } from "@/lib/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <main>
      <section className="mb-10">
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-2xl font-semibold">Infantil / Juvenil</h2>
        </div>
        <Carousel
          className="w-full hidden tablet:block"
          opts={{
            align: "start",
          }}
        >
          <CarouselContent className="tablet:ml-4.5 desktop:ml-3">
            {BOOK_ITEMS.map((book) => (
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
    </main>
  );
}
