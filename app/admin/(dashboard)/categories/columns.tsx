"use client";

import Action from "@/components/ui/action";
import { Checkbox } from "@/components/ui/checkbox";
import { useEditCategoryStore } from "@/lib/stores";
import { Category } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Category>[] = [
  {
    id: "select",
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
    accessorKey: "name",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original;
      return <div>{category.name || "-"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const category = row.original;
      return <div>{format(category.createdAt, "PPP")}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ row }) => {
      const category = row.original;
      return <div>{format(category.updatedAt, "PPP")}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { onOpen } = useEditCategoryStore();
      const category = row.original;

      return (
        <Action
          href={`/admin/category/${category.id}`}
          onClick={() => onOpen(category.id)}
        />
      );
    },
  },
];
