import { Suspense } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import HeaderAuth from "./Header-auth";
import Link from "next/link";
import { paths } from "@/paths";
import SearchInput from "./Header-Search";

export default function Header() {
  return (
    <header className=" w-fit mx-auto shadow p-4 ">
      <NavigationMenu>
        <NavigationMenuList className=" flex md:gap-16 lg:gap-40 gap-9  ">
          <NavigationMenuItem className=" cursor-pointer ">
            <NavigationMenuLink asChild className=" font-medium text-[20px] ">
              <Link href={paths.homePath()}> Discuss </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Suspense>
              <SearchInput/>
            </Suspense>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <HeaderAuth />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
