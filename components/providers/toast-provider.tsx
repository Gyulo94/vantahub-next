"use client";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      toastOptions={{
        style: {
          background: theme === "dark" ? "#333" : "#ffffff",
          color: theme === "dark" ? "#fff" : "#111827",
        },
      }}
    />
  );
}
