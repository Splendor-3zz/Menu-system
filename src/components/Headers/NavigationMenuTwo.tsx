import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export async function NavigationMenuDemoTwo() {


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
