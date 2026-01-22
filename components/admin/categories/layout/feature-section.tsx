"use client";

import { columns } from "@/app/admin/(dashboard)/categories/columns";
import { DataTable } from "@/app/admin/(dashboard)/categories/data-table";
import { useFindCategoriesAll } from "@/lib/queries";

export default function FeatureSection() {
  const { data } = useFindCategoriesAll();
  return <DataTable columns={columns} data={data || []} />;
}
