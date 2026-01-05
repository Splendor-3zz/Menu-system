"use client";

import { toast } from "sonner";
import { addToCartAction } from "../../../action/action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export function AddToCartButton({ id }: { id: string }) {
    const router = useRouter();
    
  const onAdd = async () => {
    
      await addToCartAction(id);
      toast.success("Added to cart.", {
        richColors: true,
        position: "top-center",
      });
      router.refresh(); // ✅ forces Server Components (cart page) to refetch
  };
  return (
    <Button
      className="w-full mt-5 cursor-pointer bg-indigo-500 text-white hover:bg-indigo-400"
      onClick={ onAdd}
    >
      Add to Cart
    </Button>
  );
}
