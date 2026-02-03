import Navbar from "@/components/shared/header/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar />
      <div className="w-full px-4 laptop:px-0">{children}</div>
    </main>
  );
}
