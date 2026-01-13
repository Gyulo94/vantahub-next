"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useResetPassword, useVerifyToken } from "@/lib/queries";
import { ResetPasswordFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import toast from "react-hot-toast";

export function ResetPasswordForm() {
  const router = useRouter();
  const token = useParams<{ token: string }>().token;
  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      email: "",
      token: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { data: email, isError, error, isLoading } = useVerifyToken(token);
  const { mutate: resetPassword } = useResetPassword();

  if (!isLoading) {
    setTimeout(() => {
      form.setValue("email", email);
      form.setValue("token", token);
    }, 0);
  }
  if (isError) {
    if (error instanceof Error) {
      toast.error(error.message);
      router.replace("/register");
    }
  }

  function onSubmit(values: z.infer<typeof ResetPasswordFormSchema>) {
    resetPassword(values);
  }

  return (
    <div className="flex flex-col">
      <Card className="py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Restablecer Contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nueva Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Nueva Contraseña"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirmar Nueva Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Confirmar Nueva Contraseña"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button>Restablecer Contraseña</Button>
                <div className="text-sm text-center text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href={"/login"}
                    className="text-foreground link hover:underline underline-offset-2"
                  >
                    Iniciar sesión
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
