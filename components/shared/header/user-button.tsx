"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/ui/user-avatar";
import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";

export default function UserButton() {
  const [isLogin, setIsLogin] = useState(true);

  return !isLogin ? (
    <div className="rounded-full bg-secondary p-2 shadow-md hover:bg-secondary/80 transition-colors cursor-pointer">
      <AiOutlineUser />
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <UserAvatar
          url={"https://avatars.githubusercontent.com/u/48601803?v=4"}
          name={"Vanta"}
          isTooltipEnabled={false}
          className="cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60" sideOffset={10}>
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <UserAvatar
            url={"https://avatars.githubusercontent.com/u/48601803?v=4"}
            name={"Vanta"}
            isTooltipEnabled={false}
            className="size-20 border border-neutral-300"
          />
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-sm font-medium text-neutral-900">{"Vanta"}</h2>
            <p className="text-xs text-neutral-500">{"vanta@example.com"}</p>
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
