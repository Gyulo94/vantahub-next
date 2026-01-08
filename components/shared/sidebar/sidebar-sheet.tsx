import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SIDEBAR_ITEMS } from "@/lib/constants";
import { useOpenMenuStore } from "@/lib/stores";
import Link from "next/link";

export default function SidebarSheet() {
  const { isOpen, onClose } = useOpenMenuStore();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader className="border-b-2">
          <SheetTitle className={"text-2xl"}>VantaHub</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold px-4">Categories</h2>
          <ul>
            {SIDEBAR_ITEMS.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className={
                    "flex items-center justify-between px-7 py-2 rounded-md text-muted-foreground hover:text-accent-foreground hover:bg-secondary transition-colors cursor-pointer"
                  }
                >
                  <span className="text-lg">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
