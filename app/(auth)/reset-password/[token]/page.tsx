import { ResetPasswordForm } from "@/components/auth/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Restablecer Contraseña",
};

export default async function ResetPassword() {
  return <ResetPasswordForm />;
}
