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

export async function NavigationMenuDemo() {
  const { userId } = await auth();

  const ordersCount = await getAllOrdersAction();
  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;

  return (
    <div className="flex justify-center p-0 m-0 sm:m-10">
      <div>
        <NavigationMenu viewport={false}>
          <NavigationMenuList>
          <div className="sm:flex justify-center">
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link className="w-full sm:w-fit" href={"/"}>Home</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link className="w-full sm:w-fit" href={"/CategoryPage"}>Menu</Link>
            </NavigationMenuItem>
            <NavigationMenuItem
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link className="w-full sm:w-fit" href="/About">Contact Us</Link>
            </NavigationMenuItem>
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
            {isAdmin && (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="w-full sm:w-fit">Add</NavigationMenuTrigger>
                <NavigationMenuContent >
                  <ul className="grid w-full">
                    <li className="space-y-1">
                      <CategoryDialog userId={userId} />
                      <AddButton userId={userId} />
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )}
            {isAdmin && (
              <NavigationMenuItem
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="w-full sm:w-fit" href="/Orders">
                  Orders <OrderCount />{" "}
                </Link>
              </NavigationMenuItem>
            )}
            {isAdmin && (
              <NavigationMenuItem
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link className="w-full sm:w-fit" href="/DragAndDrop">
                  Drag and Drop
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
