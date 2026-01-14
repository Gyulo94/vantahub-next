"use client";

import Logo from "../logo";
import { NAV_ITEMS } from "@/lib/constants";
import NavItem from "../nav-item";
import UserButton from "../user-button";
import { useOpenMenuStore } from "@/lib/stores";
import { IoMenu } from "react-icons/io5";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TopSection() {
  const { onOpen } = useOpenMenuStore();
  return (
    <div className="flex items-center justify-between">
      <Logo />
      <div className="hidden tablet:flex items-center gap-3">
        <ThemeToggle />
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
        <UserButton />
      </div>
      <div>
        <IoMenu
          className="tablet:hidden size-8 rounded-md transition-colors cursor-pointer"
          onClick={onOpen}
        />
      </div>
    </div>
  );
}
