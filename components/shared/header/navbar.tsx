import TopSection from "./layout/top-section";
import BottomSection from "./layout/bottom-section";

export default function Navbar() {
  return (
    <header className="w-full flex flex-col border backdrop-blur-xs">
      <nav className="w-full max-w-7xl flex flex-col px-4 xl:px-0 py-2 mx-auto">
        <TopSection />
        <BottomSection />
      </nav>
    </header>
  );
}
