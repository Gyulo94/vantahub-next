"use client";

import { columns } from "@/app/admin/(dashboard)/authors/columns";
import { DataTable } from "@/app/admin/(dashboard)/authors/data-table";
import { useFindAuthorsAll } from "@/lib/queries";

export default function FeatureSection() {
  const { data } = useFindAuthorsAll();
  return <DataTable columns={columns} data={data || []} />;
}
