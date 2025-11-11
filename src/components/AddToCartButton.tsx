"use client";

import { addToCartAction } from "../../action/action";
import { Button } from "./ui/button";

export function AddToCartButton({ id }: { id: string }) {
  const handleClick = async () => {
    await addToCartAction(id);
  };

  return (
    <Button onClick={handleClick} className="w-full mt-5 cursor-pointer">
      Add to Cart
    </Button>
  );
}