"use client";

import { getItemStatuAction, hideItemAction } from "../../../action/action";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface IProps {
  id: string;
  children: React.ReactNode;
}

const HideItemButton = ({ id, children }: IProps) => {
  return (
    <Button
      className="w-full cursor-pointer bg-amber-300 hover:bg-amber-200"
      onClick={async () => {
        await hideItemAction({ id });
        const item = await getItemStatuAction(id);
        {
          item === true
            ? toast.info("the item has been hedden successfully.", {
                richColors: true,
                position: "top-center",
              })
            : toast.info("the item is visible now.", {
                richColors: true,
                position: "top-center",
              });
        }
      }}
    >
      {children}
    </Button>
  );
};

export default HideItemButton;
