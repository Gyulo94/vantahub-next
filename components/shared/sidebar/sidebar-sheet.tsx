import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { LOGO, SIDEBAR_ITEMS } from "@/lib/constants";
import { useOpenMenuStore } from "@/lib/stores";
import SidebarItem from "./sidebar-item";
import Image from "next/image";

export default function SidebarSheet() {
  const { isOpen, onClose } = useOpenMenuStore();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-full max-w-70! bg-background/95">
        <SheetHeader className="border-b-2 flex-row items-center">
          <Image
            src={LOGO}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full shadow-md"
          />
          <SheetTitle className={"text-2xl"}>VantaHub</SheetTitle>
          <SheetDescription className="sr-only">
            Sidebar navigation
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          <h2 className="px-7.5 text-[16px] py-3.5 font-bold">Categories</h2>
          <nav>
            <ul>
              {SIDEBAR_ITEMS.map((item, index) => (
                <SidebarItem key={index} item={item} />
              ))}
            </ul>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
