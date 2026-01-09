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

    const fetchItems = async () => {
      setLoading(true);
      setItems([]);

      const result = await getAdminItemsAction(selected);
      setItems(result);
      
      setLoading(false);
    };

    fetchItems();
  }, [selected]);

  const cate = categories.find((c) => c.id === selected)?.title ?? "Select category";


  return (
    <div>
      <div className="mt-5 mb-10">
        {loading ? (
          <h1 className="text-3xl m-10">Loading items…</h1>
        ) : (items.length ? (
          <div className="flex flex-col justify-center items-center content-center">
            <h1 className="text-2xl text-center mb-5">Sort Items</h1>
            <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="" variant="outline">{cate}</Button>
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
            {/* IMPORTANT: pass the right prop name */}
            <div className="w-full px-10">
              <ItemReorderList categories={items} />
            </div>
          </div>
        ) : (
          <h1 className="text-3xl m-10">There are no items yet…</h1>
        ))}
      </div>
    </div>
  );
}
