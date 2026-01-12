import { useMutation } from "@tanstack/react-query";
import { login } from "../actions";
import toast from "react-hot-toast";

export function useLogin() {
  const mutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      window.location.href = "/dashboard";
    },
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message !== "NEXT_REDIRECT") {
          toast.error("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
    },
  });
  return mutation;
}
