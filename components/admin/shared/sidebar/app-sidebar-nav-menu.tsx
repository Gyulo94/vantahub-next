"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
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
import { Home } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Inicio",
    href: "/admin",
    icon: Home,
  },
];

export default function AppSidebarNavMenu() {
  const { state } = useSidebar();
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Aplicaciones</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            return (
              <Tooltip key={item.label}>
                <SidebarMenuItem>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      className={
                        pathname.includes(item.href) ? "bg-secondary" : ""
                      }
                      asChild
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                </SidebarMenuItem>
                {state === "collapsed" && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
