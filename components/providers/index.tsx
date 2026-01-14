import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ThemeProvider } from "../ui/theme-provider";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        disableTransitionOnChange
      >
        <QueryProvider>
          {children}
          <ModalProvider />
          <Toaster />
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
