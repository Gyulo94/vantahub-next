import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

interface Props {
  item: {
    title: string;
    icon: React.ElementType;
    url: string;
  };
}

export default function NavItem({ item }: Props) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Link href={item.url}>
          <item.icon className="size-8 cursor-pointer text-muted-foreground hover:text-accent-foreground" />
        </Link>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
