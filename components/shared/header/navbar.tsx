import Logo from "./logo";
import NavItem from "./nav-item";
import UserButton from "./user-button";
import { NAV_ITEMS } from "@/lib/constants";

export default function Navbar() {
  return (
    <header className="w-full h-14 flex border-b backdrop-blur-xs">
      <nav className="w-full max-w-7xl flex items-center justify-between px-4 lg:px-0 py-2 mx-auto">
        <Logo />
        <div className="flex items-center gap-3">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
