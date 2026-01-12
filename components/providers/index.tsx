import ModalProvider from "./modal-provider";
import QueryProvider from "./query-provider";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <ModalProvider />
      <Toaster />
    </QueryProvider>
  );
}
