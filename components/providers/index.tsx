import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        {children}
        <ModalProvider />
        <Toaster />
      </QueryProvider>
    </SessionProvider>
  );
}
