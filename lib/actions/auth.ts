"use server";

import z from "zod/v3";
import { LoginFormSchema } from "../validations";
import { signIn } from "@/auth";

export async function login(values: z.infer<typeof LoginFormSchema>) {
  const { email, password } = values;
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
}
