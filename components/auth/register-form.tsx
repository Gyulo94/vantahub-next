"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegister, useVerifyToken } from "@/lib/queries";
import { RegisterFormSchema } from "@/lib/validations";
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

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      token: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
  });
  const token = useParams<{ token: string }>().token;

  const { data: email, isError, error, isLoading } = useVerifyToken(token);

  const { mutate: register } = useRegister();

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
  function onSubmit(values: z.infer<typeof RegisterFormSchema>) {
    register(values);
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Registrarse</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Contraseña"
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
                          <FormLabel>Confirmar Contraseña</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Confirmar Contraseña"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button>Registrarse</Button>
                </div>
                <div className="text-sm text-center text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href={"/login"}
                    className="text-foreground link hover:underline underline-offset-2"
                  >
                    Iniciar Sesión
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
