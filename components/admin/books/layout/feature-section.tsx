"use client";

import { columns } from "@/app/admin/(dashboard)/books/columns";
import { DataTable } from "@/app/admin/(dashboard)/books/data-table";
import { useFindBooksAll } from "@/lib/queries";

export default function FeatureSection() {
  const { data } = useFindBooksAll();
  console.log(data);

  return <DataTable columns={columns} data={data || []} />;
}
