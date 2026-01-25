"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Book } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import Action from "@/components/ui/action";
import { useEditBookStore } from "@/lib/stores";

export const columns: ColumnDef<Book>[] = [
  {
    id: "select",
    size: 50,
    header: ({ table }) => (
      <Checkbox
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        checked={row.getIsSelected()}
      />
    ),
  },
  {
    accessorKey: "image",
    header: "Image",
    size: 80,
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div className="w-20 h-30 aspect-1/2 relative shadow-md rounded-md overflow-hidden border">
          <Image
            src={book.image?.url || "-"}
            alt={book.title || "-"}
            fill
            className="rounded-md object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 200,
    cell: ({ row }) => {
      const book = row.original;
      return <div>{book.title || "-"}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    size: 200,
    cell: ({ row }) => {
      const book = row.original;
      return <div className="line-clamp-1">{book.category?.name || "-"}</div>;
    },
  },
  {
    accessorKey: "author",
    header: "Author",
    size: 200,
    cell: ({ row }) => {
      const book = row.original;
      return <div>{book.author?.name || "-"}</div>;
    },
  },
  {
    accessorKey: "totalPages",
    header: "Pages",
    size: 100,
    cell: ({ row }) => {
      const book = row.original;
      return <div>{book.totalPages || 0}</div>;
    },
  },
  {
    accessorKey: "publishedAt",
    header: "Published At",
    size: 150,
    cell: ({ row }) => {
      const book = row.original;
      return (
        <div>{format(book.publishedAt, "PPP", { locale: es }) || "-"}</div>
      );
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => {
      const book = row.original;
      const { onOpen } = useEditBookStore();
      return (
        <Action
          href={`/admin/book/${book.id}`}
          onClick={() => onOpen(book.id)}
        />
      );
    },
  },
];
