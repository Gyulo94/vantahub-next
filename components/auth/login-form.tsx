"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/queries";
import { LoginFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
import SocialLogin from "./social-login";

export function LoginForm() {
  const { mutate: login } = useLogin();
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginFormSchema>) {
    login(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-6"
              >
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Correo Electrónico</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Correo Electrónico"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex items-center">
                          <FormLabel>Contraseña</FormLabel>
                          <Link
                            href="/reset-password"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Olvidé mi contraseña
                          </Link>
                        </div>

                        <FormControl>
                          <Input
                            placeholder="Contraseña"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button>Iniciar Sesión</Button>
              </form>
            </Form>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>

            <div>
              <SocialLogin />
            </div>
            <div className="text-sm text-center text-muted-foreground">
              ¿No tienes una cuenta?{" "}
              <Link
                href={"/signup"}
                target="_self"
                className="text-foreground link hover:underline underline-offset-2"
              >
                Registrarse
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
