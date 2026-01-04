import { Role } from "@prisma/client";
import { getCurrentUserAction, getSortedCategoriesAction } from "../../../action/action";
import CategorySortList from "@/components/DragAndDrop/SortingCategories";



const page = async () => {

      const user = await getCurrentUserAction();
  if (user?.role !== Role.ADMIN) return <div>Access denied</div>;

  const categories = await getSortedCategoriesAction();

    return(
        <div>
            <div className="mt-5">
                <div className="p-10">
                    <h1 className="text-2xl mb-5 text-center">Sort Categories</h1>
                    <CategorySortList categories={categories} />
                </div>
            </div>
        </div>
    )
}

export default page