"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import UserAvatar from "@/components/ui/user-avatar";
import { DEFAULT_AVATAR } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function UserButton() {
  const { data: session, status } = useSession({ required: true });
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isAuthenticated = isMounted ? status === "authenticated" : false;

  if (!isMounted) {
    return <Skeleton className="size-8 rounded-full" />;
  }

  return !isAuthenticated ? (
    <div className="rounded-full bg-secondary p-1.5 shadow-md hover:bg-secondary/80 transition-colors cursor-pointer">
      <AiOutlineUser className="size-5" onClick={() => router.push("login")} />
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <UserAvatar
          url={session?.user?.image || DEFAULT_AVATAR}
          name={session?.user?.name || "unknown"}
          isTooltipEnabled={false}
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <UserAvatar
            url={session?.user?.image || DEFAULT_AVATAR}
            name={session?.user?.name || "unknown"}
            isTooltipEnabled={false}
            className="size-20 border border-neutral-300"
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-sm font-medium text-neutral-900">
              {session?.user?.name || "unknown"}
            </h2>
            <p className="text-xs text-neutral-500">
              {session?.user?.email || "unknown@example.com"}
            </p>
          </div>
        </div>
        <Separator className="mb-1" />
        <DropdownMenuItem
          className="h-10 flex items-center justify-center font-medium cursor-pointer hover:bg-secondary"
          onClick={() => {}}
        >
          Mi Perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          className="h-10 flex items-center justify-center font-medium text-destructive hover:text-destructive/80! hover:bg-destructive/10! cursor-pointer"
          onClick={() => {}}
        >
          Finalizar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
