"use client";

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa";

export default function SocialLogin() {
  const providerLogin = async () => {
    await signIn("google", {
      redirect: true,
      redirectTo: "/",
    });
  };

  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={providerLogin}
    >
      <p className="flex items-center gap-2">
        <FaGoogle /> Google
      </p>
    </Button>
  );
}
