"use client";

import { LOGO } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center w-full gap-3 ">
      <Image
        src={LOGO}
        alt="logo"
        width={40}
        height={40}
        className="rounded-full shadow-md"
      />
      <h1 className="text-2xl font-bold">VantaHub</h1>
    </Link>
  );
}
