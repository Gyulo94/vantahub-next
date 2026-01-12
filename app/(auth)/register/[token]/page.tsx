import { RegisterForm } from "@/components/auth/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default async function Register() {
  return <RegisterForm />;
}
