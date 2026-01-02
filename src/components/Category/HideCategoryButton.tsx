"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  getCategoryStatuAction,
  hideCategoryAction,
} from "../../../action/action";

interface IProps {
  id: string;
  children: React.ReactNode;
}

const HideCategoryButton = ({ id, children }: IProps) => {
  return (
    <Button
      className="w-full mb-2 cursor-pointer bg-amber-300 hover:bg-amber-200"
      onClick={async () => {
        await hideCategoryAction({ id });
        const item = await getCategoryStatuAction(id);
        {
          item === true
            ? toast.info("the category has been hedden successfully.", {
                richColors: true,
                position: "top-center",
              })
            : toast.info("the category is visible now.", {
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

export default HideCategoryButton;
