import Link from "next/link";

interface Props {
  item: {
    label: string;
    href: string;
  };
}

export default function NavBottomItem({ item }: Props) {
  return (
    <Link
      href={item.href}
      className="leading-6 text-[16px] py-1.25 px-3 font-medium text-muted-foreground hover:text-foreground"
    >
      {item.label}
    </Link>
  );
}
