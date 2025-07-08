"use client";

import { useSession } from "next-auth/react";
import * as action from "@/actions/index";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderAuth() {
  const session = useSession();

  let authButton: React.ReactNode;

  if (session.status === "loading") {
    authButton = null;
  } else if (session.data?.user) {
    authButton = (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar className="rounded-lg cursor-pointer">
            <AvatarImage src={session.data.user.image || ""} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <form action={action.signOut}>
              <Button className=" cursor-pointer ">Log out</Button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  } else
    authButton = (
      <form action={action.signIn}>
        <Button className=" cursor-pointer ">sign in</Button>
      </form>
    );

    return authButton;
}
