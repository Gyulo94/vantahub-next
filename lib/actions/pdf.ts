"use server";

import axios from "axios";
import { FILE_URL } from "../constants";

export async function pdfUpload(formData: FormData) {
  try {
    const response = await axios.post(`${FILE_URL}/pdfs`, formData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;
      throw new Error(message);
    }
  }
}
