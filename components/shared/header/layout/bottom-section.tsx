"use client";

import { NAV_FOOTER_LEFT_ITEMS, NAV_FOOTER_RIGHT_ITEMS } from "@/lib/constants";
import { useOpenMenuStore } from "@/lib/stores";
import { IoMenu } from "react-icons/io5";
import NavBottomItem from "../nav-bottom-item";

export default function BottomSection() {
  const { onOpen } = useOpenMenuStore();
  return (
    <div className="flex justify-between items-center pt-5.5 pb-5">
      <div className="flex items-center">
        <IoMenu
          className="size-10 rounded-full p-2 border hover:bg-secondary transition-colors cursor-pointer"
          onClick={onOpen}
        />
        {NAV_FOOTER_LEFT_ITEMS.map((item, index) => (
          <NavBottomItem key={index} item={item} />
        ))}
      </div>
      <div className="flex items-center">
        {NAV_FOOTER_RIGHT_ITEMS.map((item, index) => (
          <NavBottomItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
