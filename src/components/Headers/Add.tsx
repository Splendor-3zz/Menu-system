import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Plus } from "lucide-react";
import { CategoryDialog } from "../Category/CategoryDialog";
import AddButton from "../Items/AddButton";
import { auth } from "@clerk/nextjs/server";
import {
  getCurrentUserAction,
} from "../../../action/action";


export async function Add() {
  const { userId } = await auth();

  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <div className="flex justify-center p-0 m-0">
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
          <div className="sm:flex justify-center">
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-fit ml-25 sm:w-fit"><Plus/></NavigationMenuTrigger>
                <NavigationMenuContent className=" z-10" >
                  <ul className="grid w-full">
                    <li className="space-y-1">
                      <CategoryDialog userId={userId} />
                      <AddButton userId={userId} />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            </div>
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
