"use server";

import { auth } from "@/auth";
import { SERVER_URL } from "../constants";
import axios from "axios";
import { ReviewRequest } from "../types";

export async function findReviewsAll(request: ReviewRequest) {
  const session = await auth();
  const token = session?.serverTokens.accessToken;
  try {
    const response = await axios.get(`${SERVER_URL}/review/all`, {
      params: { ...request },
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
