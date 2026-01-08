import ModalProvider from "./modal-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ModalProvider />
    </>
  );
}
