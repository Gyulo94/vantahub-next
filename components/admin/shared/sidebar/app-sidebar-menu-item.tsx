"use client";

import {
  SidebarGroup,
  SidebarGroupAction,
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
import { Plus } from "lucide-react";
import Link from "next/link";
import { IconType } from "react-icons/lib";

interface Props {
  item: {
    label: string;
    icon: IconType;
    href: string;
    subItems: {
      label: string;
      href: string;
      icon: IconType;
    }[];
    gender: string;
  };
}

export default function AppSidebarMenuItem({ item }: Props) {
  const { state } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
      <SidebarGroupAction>
        <Plus /> <span className="sr-only">Add {item.label}</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    <item.icon />
                    {item.gender === "MALE" ? "Todos" : "Todas"} {item.label}
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              {state === "collapsed" && (
                <TooltipContent side="right">{item.label}</TooltipContent>
              )}
            </Tooltip>
          </SidebarMenuItem>

          {item.subItems.map((subItem) => (
            <SidebarMenuItem key={subItem.label}>
              <Tooltip>
                <SidebarMenuButton asChild>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link href="#">
                        <subItem.icon />
                        Añadir {subItem.label}
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                </SidebarMenuButton>
                {state === "collapsed" && (
                  <TooltipContent side="right">
                    Añadir {subItem.label}
                  </TooltipContent>
                )}
              </Tooltip>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
