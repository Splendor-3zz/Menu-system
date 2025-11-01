"use client";
import { IItem } from "@/interface"
import { Button } from "./ui/button";
import { deleteItemsAction } from "../../action/action";

const DeleteButtonItem = ({item}: {item: IItem} ) => {
    return(
        <Button className="my-5 cursor-pointer bg-red-500 hover:bg-red-400 w-20" onClick={async () => {
            await deleteItemsAction({id: item.id})
        }}>Delete</Button>
        )
}

export default DeleteButtonItem