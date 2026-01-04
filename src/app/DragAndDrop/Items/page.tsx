import { getAdminCategoriesAction } from "../../../../action/action";
import { DropdownMenuRadioGroupDemo } from "@/components/DragAndDrop/DropDown";


const page = async () => {
  const categories = await getAdminCategoriesAction();

  return (
    <div>
      <DropdownMenuRadioGroupDemo categories={categories} />
    </div>
  );
};

export default page;
