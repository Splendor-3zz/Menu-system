import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
import { Role } from "@prisma/client";
import { CategoryDialog } from "../CategoryDialog";
import AddButton from "../AddButton";
import { auth } from "@clerk/nextjs/server";
import { cartItemsAction, getCurrentUserAction } from "../../../action/action";
import CartLength from "../CartLength";

export async function NavigationMenuDemo() {
  const user = Role.USER;
  const { userId } = await auth();

   

  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;

  return (
    <div className="flex justify-center m-10">
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={"/"}>Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={"/CategoryPage"}>Menu</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="">Contact Us</Link>
            </NavigationMenuItem>
            {!isAdmin && (
              <NavigationMenuItem
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/Cart">
                  <ShoppingCart /><CartLength/>
                </Link>
              </NavigationMenuItem>
            )}
            {isAdmin && (
              <NavigationMenuItem className="hidden md:block z-1">
                <NavigationMenuTrigger>Add</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-full ">
                    <li className="space-y-1">
                      <CategoryDialog userId={userId} />
                      <AddButton userId={userId} />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
