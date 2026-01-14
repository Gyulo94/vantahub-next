"use client";

import { User } from "lucide-react";
import AppSidebarMenuItem from "./app-sidebar-menu-item";
import {
  LuBook,
  LuBookmarkPlus,
  LuBookPlus,
  LuUserRoundPlus,
} from "react-icons/lu";

const SIDEBAR_ITEMS = [
  {
    label: "Libros",
    icon: LuBook,
    href: "/books",
    subItems: [{ label: "Libro", href: "#", icon: LuBookPlus }],
    gender: "MALE",
  },
  {
    label: "Categorías",
    icon: LuBookmarkPlus,
    href: "/categories",
    subItems: [{ label: "Categoría", href: "#", icon: LuBookmarkPlus }],
    gender: "FEMALE",
  },
  {
    label: "Usuarios",
    icon: User,
    href: "/users",
    subItems: [{ label: "Usuario", href: "#", icon: LuUserRoundPlus }],
    gender: "MALE",
  },
];

export default function AppSidebarMenu() {
  return SIDEBAR_ITEMS.map((item) => (
    <AppSidebarMenuItem key={item.label} item={item} />
  ));
}
