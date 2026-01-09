import Link from "next/link";

interface Props {
  subItem: { label: string; href: string };
}

export default function SidebarSubItem({ subItem }: Props) {
  return (
    <li>
      <Link
        className="hover:bg-background hover:underline px-2 md:px-7.5 py-2.5 flex items-center justify-between text-[16px] w-full cursor-pointer focus:bg-background focus:font-medium"
        href={subItem.href}
      >
        <div className="flex items-center gap-1">{subItem.label}</div>
      </Link>
    </li>
  );
}
