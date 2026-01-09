import { LuLibraryBig } from "react-icons/lu";
import { LuBookMinus } from "react-icons/lu";
import { LuTrophy } from "react-icons/lu";

export const SIDEBAR_ITEMS = [
  {
    label: "Narrativa / Literatura",
    href: "/categories/narrativa-literatura",
    icon: LuBookMinus,
    subItems: [
      {
        label: "Literatura Infantil / Juvenil",
        href: "/categories/literatura-infantil-juvenil",
      },
      {
        label: "Clásicos",
        href: "/categories/clasicos",
      },
      {
        label: "Leyendas",
        href: "/categories/leyendas",
      },
      {
        label: "Poemas",
        href: "/categories/poemas",
      },
      {
        label: "Audiolibros",
        href: "/categories/audiolibros",
      },
    ],
  },
  {
    label: "Desafíos",
    href: "/categories/desafios",
    icon: LuTrophy,
    subItems: [
      {
        label: "consejos",
        href: "/categories/consejos",
      },
      {
        label: "Desafíos",
        href: "/categories/desafios",
      },
    ],
  },
];

export const NAV_FOOTER_LEFT_ITEMS = [
  {
    label: "Literatura Infantil / Juvenil",
    href: "/categories/literatura-infantil-juvenil",
  },
  {
    label: "Clásicos",
    href: "/categories/clasicos",
  },
  {
    label: "Leyendas",
    href: "/categories/leyendas",
  },
  {
    label: "Poemas",
    href: "/categories/poemas",
  },
  {
    label: "Audiolibros",
    href: "/categories/audiolibros",
  },
];

export const NAV_FOOTER_RIGHT_ITEMS = [
  {
    label: "Consejos",
    href: "/categories/consejos",
  },
  {
    label: "Desafíos",
    href: "/categories/desafios",
  },
];

export const NAV_ITEMS = [
  {
    title: "Mi Biblioteca",
    icon: LuLibraryBig,
    url: "/my-library",
  },
];

export const LOGO = "/logo.jpg";
