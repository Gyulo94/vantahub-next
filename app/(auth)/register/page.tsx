import EmailForm from "@/components/auth/email-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrarse",
};

export default async function Register() {
  return <EmailForm type="register" />;
}
