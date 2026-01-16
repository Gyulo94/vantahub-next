"use client";

import { User } from "lucide-react";
import AppSidebarMenuItem from "./app-sidebar-menu-item";
import { LuBook, LuBookmarkPlus, LuUserPen } from "react-icons/lu";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";

const SIDEBAR_ITEMS = [
  {
    label: "Libros",
    icon: LuBook,
    href: "/admin/books",
  },
  {
    label: "Authors",
    icon: LuUserPen,
    href: "/admin/authors",
  },
  {
    label: "Categorías",
    icon: LuBookmarkPlus,
    href: "/admin/categories",
  },
  {
    label: "Usuarios",
    icon: User,
    href: "/admin/users",
  },
];

export default function AppSidebarMenu() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Sidebar Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {SIDEBAR_ITEMS.map((item) => (
              <AppSidebarMenuItem key={item.label} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
