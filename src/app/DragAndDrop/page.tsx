import { NavigationMenuDemoTwo } from "@/components/header/NavigationMenuTwo"
import { ICate } from "@/interface";
import { Role } from "@prisma/client";
import CategorySortList from "@/components/SortingCategories";
import { getCurrentUserAction, getSortedCategoriesAction } from "../../../action/action";


interface IProps {
    category: ICate[];
}

const page = async ({category}: IProps) => {

      const user = await getCurrentUserAction();
  if (user?.role !== Role.ADMIN) return <div>Access denied</div>;

  const categories = await getSortedCategoriesAction();

    return(
        <div>
            <NavigationMenuDemoTwo/>
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