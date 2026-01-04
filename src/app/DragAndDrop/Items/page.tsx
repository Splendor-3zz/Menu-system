import { getAdminCategoriesAction } from "../../../../action/action";
import { DropdownMenuRadioGroupDemo } from "@/components/DragAndDrop/DropDown";

interface IProps {}

const page = async ({}: IProps) => {
  const categories = await getAdminCategoriesAction();

  return (
    <div>
      <DropdownMenuRadioGroupDemo categories={categories} />
    </div>
  );
};

export default page;
