"use server";

import z from "zod/v3";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { auth } from "@/auth";
import { BookFormSchema } from "../validations";

export async function createBook(value: z.infer<typeof BookFormSchema>) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.post(`${SERVER_URL}/book/create`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function findBooksAll() {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/book/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function findBookById(id?: number) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/book/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export async function updateBook(
  id?: number,
  values?: z.infer<typeof BookFormSchema>,
) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.put(
      `${SERVER_URL}/book/update/${id}`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
    throw error;
  }
}

export async function deleteManyBooks(ids: number[]) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.delete(`${SERVER_URL}/book/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { ids },
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

export async function readingBook(id?: number) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/book/read/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
