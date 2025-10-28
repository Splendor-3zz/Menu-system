import { getCategoriesAction } from "../../action/action";
import { ItemDialog } from "./ItemDialog";

interface IProps {

}

const AddButton = async ({}: IProps) => {
    const categories = await getCategoriesAction();
    return(
        <ItemDialog categories={categories}/>
    )
}

export default AddButton