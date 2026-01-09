import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ShoppingCart } from "lucide-react";
import {
  getCurrentUserAction,
} from "../../../action/action";
import CartLength from "../Cart/CartLength";


export async function Cart() {

  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <div className="flex justify-center p-0 m-0">
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
          <div className="sm:flex justify-center">
            {!isAdmin && (
              <NavigationMenuItem
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="w-full sm:w-fit" href="/Cart">
                  <ShoppingCart /> <CartLength />
                </Link>
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
