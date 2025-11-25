"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";
import { getCategoryStatuAction, hideCategoryAction } from "../../../action/action";

interface IProps {
    id: string;
    children: React.ReactNode;
}

const HideCategoryButton = ({id, children}: IProps) => {
    return(
        <Button
      className="w-full mb-2 cursor-pointer bg-amber-300 hover:bg-amber-200"
      onClick={async () => {
        await hideCategoryAction({id});
        const item = await getCategoryStatuAction(id);
        {item === true ? toast.success("the category has been hedden successfully."): toast.success("the category is visible now.")}
      }}
    >
        {children}
    </Button>
    )
}

export default HideCategoryButton