import { auth } from "@clerk/nextjs/server";
import { getCategoriesAction } from "../../action/action";
import { ItemDialog } from "./ItemDialog";


const AddButton = async ({userId}: {userId: string | null}) => {
    const categories = await getCategoriesAction();
    return(
        <ItemDialog categories={categories} userId={userId}/>
    )
}

export default AddButton