"use server";

import z from "zod/v3";
import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetPasswordFormSchema,
} from "../validations";
import { signIn } from "@/auth";
import { SERVER_URL } from "../constants";
import axios from "axios";

export async function login(values: z.infer<typeof LoginFormSchema>) {
  const { email, password } = values;
  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
}

export async function register(values: z.infer<typeof RegisterFormSchema>) {
  const { name, email, token, password } = values;
  await axios.post(`${SERVER_URL}/auth/register`, {
    name,
    email,
    token,
    password,
  });

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
}

export async function sendEmail(email: string, type: "register" | "reset") {
  const url =
    type === "register"
      ? `${SERVER_URL}/auth/send-register-email`
      : `${SERVER_URL}/auth/send-reset-password-email`;

  try {
    const response = await axios.post(url, {
      email,
      type,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function verifyToken(token: string) {
  try {
    const response = await axios.get(`${SERVER_URL}/auth/verify-token`, {
      params: { token },
    });
    return response.data.body;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export const resetPassword = async (
  values: z.infer<typeof ResetPasswordFormSchema>
) => {
  const { email, token, password } = values;
  try {
    const response = await axios.post(`${SERVER_URL}/auth/reset-password`, {
      email,
      token,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
};
