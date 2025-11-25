"use client";

import { toast } from "sonner";
import { addToCartAction } from "../../../action/action";
import { Button } from "../ui/button";

export function AddToCartButton({ id }: { id: string }) {
  return (
    <Button
      className="w-full mt-5 cursor-pointer"
      onClick={async () => {
        await addToCartAction(id),
          toast.success("the item has been added to cart successfully.");
      }}
    >
      Add to Cart
    </Button>
  );
}
