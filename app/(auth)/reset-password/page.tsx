import EmailForm from "@/components/auth/email-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
};

export default async function ResetPassword() {
  return <EmailForm type="reset" />;
}
