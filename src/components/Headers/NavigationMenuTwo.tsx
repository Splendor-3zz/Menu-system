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
import { CategoryDialog } from "../Category/CategoryDialog";
import AddButton from "../Items/AddButton";
import { auth } from "@clerk/nextjs/server";
import {
  getAllOrdersAction,
  getCurrentUserAction,
} from "../../../action/action";
import CartLength from "../Cart/CartLength";
import OrderCount from "../Order/OrderCount";

export async function NavigationMenuDemoTwo() {
  const { userId } = await auth();

  const ordersCount = await getAllOrdersAction();
  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;

  return (
    <div className="flex justify-center m-10">
      <div>
        <NavigationMenu  viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={"/DragAndDrop"}>Category</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href={"/DragAndDrop/Items"}>Items</Link>
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
