"use client";

import { Input } from "@/components/ui/input";
import { useSendMail } from "@/lib/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

type Email = { email: string };

export function EmailForm({ type }: { type: "register" | "reset" }) {
  const { mutate: sendMail } = useSendMail();

  const form = useForm<Email>({
    resolver: zodResolver(
      z.object({
        email: z
          .string()
          .email("Por favor, ingrese un correo electrónico válido.")
          .min(1, { message: "Por favor, ingrese un correo electrónico." })
          .trim(),
      })
    ),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(value: Email) {
    sendMail({ ...value, type });
  }
  return (
    <div className="flex flex-col gap-6">
      <Card className="py-6">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            Verificación de correo electrónico
          </CardTitle>
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
                          <Input placeholder="Correo Electrónico" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button>Verificar correo electrónico</Button>
                <div className="text-sm text-center text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    href={"/login"}
                    className="text-foreground link hover:underline underline-offset-2"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default EmailForm;
