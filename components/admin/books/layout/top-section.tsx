"use client";

import { Button } from "@/components/ui/button";
import { useOpenBookStore } from "@/lib/stores";
import { Plus } from "lucide-react";

export default function TopSection() {
  const { onOpen } = useOpenBookStore();
  return (
    <div className="mb-8 w-full flex justify-baseline items-center gap-4">
      <div className="w-full px-4 py-2 bg-secondary rounded-md">
        <h1 className="font-semibold">Libros</h1>
      </div>
      <Button onClick={onOpen}>
        <Plus /> New Book
      </Button>
    </div>
  );
}
