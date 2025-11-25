"use client";

import { getItemStatuAction, hideItemAction } from "../../../action/action";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface IProps {
    id: string;
    children: React.ReactNode;
}

const HideItemButton = ({id, children}: IProps) => {
    return(
        <Button
      className="w-full cursor-pointer bg-amber-300 hover:bg-amber-200"
      onClick={async () => {
        await hideItemAction({id});
        const item = await getItemStatuAction(id);
        {item === true ? toast.success("the item has been hedden successfully."): toast.success("the item is visible now.")}
      }}
    >
        {children}
    </Button>
    )
}

export default HideItemButton