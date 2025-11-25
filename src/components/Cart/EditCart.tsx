"use client";

import { Minus, Plus } from "lucide-react";
import {
  decrementCartItemAction,
  incrementCartItemAction,
} from "../../../action/action";
import { Button } from "../ui/button";

const EditCart = ({ id, quantity }: { id: string; quantity: number }) => {
  return (
    <div className="flex items-center space-x-3">
      <form action={async () => await decrementCartItemAction(id)}>
        <Button type="submit" variant="outline" className="cursor-pointer">
          <Minus />
        </Button>
      </form>
      <span className="text-lg">{quantity}</span>
      <form action={async () => await incrementCartItemAction(id)}>
        <Button type="submit" variant="outline" className="cursor-pointer">
          <Plus />
        </Button>
      </form>
    </div>
  );
};

export default EditCart;
