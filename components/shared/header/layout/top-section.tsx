import Logo from "../logo";
import { NAV_ITEMS } from "@/lib/constants";
import NavItem from "../nav-item";
import UserButton from "../user-button";

export default function TopSection() {
  return (
    <div className="flex items-center justify-between">
      <Logo />
      <div className="flex items-center gap-3">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
        <UserButton />
      </div>
    </div>
  );
}
