import Navbar from "@/components/shared/header/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto mt-5 md:mt-10 px-4 lx:px-0">
        {children}
      </div>
    </main>
  );
}
