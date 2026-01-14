"use client";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { LOGO } from "@/lib/constants";
import UserAvatar from "@/components/ui/user-avatar";

export default function AppSidebarHeader() {
  const { state } = useSidebar();
  return (
    <SidebarHeader className="py-4">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            {state === "expanded" ? (
              <Link href={"/admin"} className="flex items-center w-full gap-3 ">
                <div className="relative size-8">
                  <Image
                    src={LOGO}
                    alt="logo"
                    fill
                    className="rounded-full shadow-md"
                  />
                </div>

                <h1 className="text-xl font-bold">VantaHub</h1>
              </Link>
            ) : (
              <Link
                href={"/admin"}
                className="flex items-center w-full justify-center"
              >
                <UserAvatar
                  name="vantahub"
                  url={LOGO}
                  isTooltipEnabled={false}
                />
              </Link>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
