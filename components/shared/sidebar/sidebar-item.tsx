import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import SidebarSubItem from "./sidebar-sub-item";

interface Props {
  item: {
    label: string;
    href: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    subItems?: { label: string; href: string }[];
  };
}

export default function SidebarItem({ item }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <li>
        <Link
          className={cn(
            "hover:bg-background px-7.5 h-12.5 flex items-center justify-between fz-16 w-full cursor-pointer focus:bg-background focus:font-medium",
            isHovered && "bg-background font-medium"
          )}
          href={item.href}
        >
          <div className="flex items-center gap-1">
            <item.icon className="size-6" />
            {item.label}
          </div>
        </Link>
      </li>
      {isHovered && (
        <div className="absolute left-full md:w-full w-35 h-screen bg-background top-0 py-3 md:py-7.5">
          <nav>
            <ul>
              {item.subItems?.map((subItem, index) => (
                <SidebarSubItem key={index} subItem={subItem} />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
