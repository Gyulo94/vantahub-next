"use client";

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons/lib";

interface Props {
  item: {
    label: string;
    icon: IconType;
    href: string;
  };
}

export default function AppSidebarMenuItem({ item }: Props) {
  const { state } = useSidebar();
  const pathname = usePathname();

  return (
    <Tooltip key={item.label}>
      <SidebarMenuItem>
        <TooltipTrigger asChild>
          <SidebarMenuButton
            className={pathname.includes(item.href) ? "bg-secondary" : ""}
            asChild
          >
            <Link href={item.href}>
              <item.icon />
              <span className="text-md">{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </TooltipTrigger>
      </SidebarMenuItem>
      {state === "collapsed" && (
        <TooltipContent side="right">{item.label}</TooltipContent>
      )}
    </Tooltip>
  );
}
