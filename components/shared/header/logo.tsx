import { LOGO } from "@/lib/constants";
import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center w-full gap-3 ">
      <div className="relative size-8 tablet:size-10">
        <Image src={LOGO} alt="logo" fill className="rounded-full shadow-md" />
      </div>
      <h1 className="text-lg tablet:text-2xl font-bold">VantaHub</h1>
    </Link>
  );
}
