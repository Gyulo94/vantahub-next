import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar Sesión",
};

export default async function LoginPage() {
  return <LoginForm />;
}
