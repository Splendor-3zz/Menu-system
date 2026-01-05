"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { getAdminItemsAction } from "../../../action/action";
import ItemReorderList from "./SortingItems";

type AdminItem = {
  id: string;
  title: string;
  price: number;
  order?: number;
  imageUrl?: string;
};

interface IProps {
  categories: { id: string; title: string }[];
}

export function DropdownMenuRadioGroupDemo({ categories }: IProps) {
  const [selected, setSelected] = React.useState(categories[0]?.id);
  const [items, setItems] = useState<AdminItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setItems([]);

    const fetchItems = async () => {
      const result = await getAdminItemsAction(selected);
      setItems(result);
    };

    fetchItems();
    setLoading(false);
  }, [selected]);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Choose a Category</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>All Categories</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
            {categories.map((category) => (
              <DropdownMenuRadioItem key={category.id} value={category.id}>
                {category.title}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <div className="mt-5 mb-10">
        {loading ? (
          <h1 className="text-xl m-10">Loading items…</h1>
        ) : items.length ? (
          <div>
            <h1 className="text-2xl text-center ">Sort Items</h1>
            {/* IMPORTANT: pass the right prop name */}
            <ItemReorderList categories={items} />
          </div>
        ) : (
          <h1 className="text-3xl m-10">There are no items yet…</h1>
        )}
      </div>
    </div>
  );
}
