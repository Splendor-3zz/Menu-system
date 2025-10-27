"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./ModeToggle";
import { Plus, ShoppingCart } from "lucide-react";
import { Role } from "@prisma/client";
import { ItemDialog } from "../ItemDialog";
import { CategoryDialog } from "../CategoryDialog";

export function NavigationMenuDemo() {
  const user = Role.USER;
  
  return (
    <div className="flex justify-between m-10">
      <div>
        <ModeToggle />
      </div>
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={user? "/" : "/admin/"}>Home</Link>
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
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="">
                <ShoppingCart />
              </Link>
            </NavigationMenuItem>
             <NavigationMenuItem className="hidden md:block z-1">
                <NavigationMenuLink asChild>
                  <CategoryDialog />
                </NavigationMenuLink>
        </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={""}>Sign In</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className={`${navigationMenuTriggerStyle()} bg-orange-400 hover:bg-orange-300 focus:bg-orange-300`}
            >
              <Link href={""}>Sign Up</Link>
            </NavigationMenuItem>
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
