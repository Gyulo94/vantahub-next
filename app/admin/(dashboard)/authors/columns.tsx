"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Author } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Action from "@/components/ui/action";
import { useEditAuthorStore } from "@/lib/stores";

export const columns: ColumnDef<Author>[] = [
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
      const author = row.original;
      return (
        <div className="size-9 relative">
          <Image
            src={author.image.url}
            alt={author.name || "-"}
            fill
            className="rounded-full object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Author",
    size: 200,
    cell: ({ row }) => {
      const author = row.original;
      return <div>{author.name || "-"}</div>;
    },
  },
  {
    accessorKey: "bio",
    header: "Bio",
    size: 700,
    cell: ({ row }) => {
      const author = row.original;
      return <div className="line-clamp-1">{author.bio || "-"}</div>;
    },
  },
  {
    id: "actions",
    size: 80,
    cell: ({ row }) => {
      const author = row.original;
      const { onOpen } = useEditAuthorStore();
      return (
        <Action
          href={`/admin/author/${author.id}`}
          onClick={() => onOpen(author.id)}
        />
      );
    },
  },
];
