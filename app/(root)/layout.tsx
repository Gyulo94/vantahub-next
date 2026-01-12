import Navbar from "@/components/shared/header/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <Navbar />
      <div className="w-full tablet:max-w-3xl laptop:max-w-4xl desktop:max-w-7xl mx-auto mt-5 tablet:mt-10 px-4 laptop:px-0">
        {children}
      </div>
    </main>
  );
}
