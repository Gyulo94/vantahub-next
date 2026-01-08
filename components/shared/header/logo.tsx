"use client";

import Link from "next/link";
import { IoMenu } from "react-icons/io5";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center w-full gap-3 ">
      <IoMenu
        className="size-10 rounded-full p-2 border-2 hover:bg-secondary transition-colors cursor-pointer"
        onClick={() => {}}
      />
      <h1 className="text-2xl font-bold">VantaHub</h1>
    </Link>
  );
}
