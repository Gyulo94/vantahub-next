"use client";

import { NAV_FOOTER_RIGHT_ITEMS } from "@/lib/constants";
import { useOpenMenuStore } from "@/lib/stores";
import { IoMenu } from "react-icons/io5";
import NavBottomItem from "../nav-bottom-item";
import { useFindCategoriesAll } from "@/lib/queries";
import { useCategoryRegex } from "@/lib/hooks";

export default function BottomSection() {
  const { onOpen } = useOpenMenuStore();
  const { data } = useFindCategoriesAll();
  const categories = data || [];
  return (
    <div className="hidden tablet:flex justify-between items-center pt-5.5 pb-1.5">
      <div className="flex items-center">
        <IoMenu
          className="tablet:size-8 desktop:size-10 rounded-full p-2 border hover:bg-secondary transition-colors cursor-pointer"
          onClick={onOpen}
        />
        {categories.map((item, index) => {
          const navItem = {
            label: item.name,
            href: `/categories/${useCategoryRegex(item.name)}`,
          };
          return <NavBottomItem key={index} item={navItem} />;
        })}
      </div>
      <div className="flex items-center">
        {NAV_FOOTER_RIGHT_ITEMS.map((item, index) => (
          <NavBottomItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
