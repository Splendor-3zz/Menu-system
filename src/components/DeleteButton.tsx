'use client';

import { ICate, IItem } from "@/interface";
import { deleteCategoriesAction, deleteItemsAction } from "../../action/action";
import { Button } from "./ui/button";


const DeleteButton = ({cate}: {cate: ICate}) => {

    return(
        <Button className="my-5 cursor-pointer bg-red-500 hover:bg-red-400 w-20" onClick={async (e) => {
            e.preventDefault();       // stop the link navigation
            e.stopPropagation();      // stop click bubbling
            // your edit logic here...
            await deleteCategoriesAction({id: cate.id})
        }}>Delete</Button>
    )
}

export default DeleteButton