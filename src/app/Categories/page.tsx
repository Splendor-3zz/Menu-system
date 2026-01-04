import Link from "next/link";
import {
  getAdminCategoriesAction,
  getCategoriesAction,
  getCurrentUserAction,
} from "../../../action/action";
import DeleteButton from "@/components/Category/DeleteButton";
import { EditFormCate } from "@/components/Category/EditFormCate";
import { Role } from "@prisma/client";
import HideCategoryButton from "@/components/Category/HideCategoryButton";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category",
  description: "Choose a category",
};

const Category = async () => {
  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;

  const adminCategories = await getAdminCategoriesAction();
  const userCategories = await getCategoriesAction();
  const categories = isAdmin ? adminCategories : userCategories;

  return (
    <div className="mt-15">
      <div className="flex flex-wrap justify-around">
        {!categories.length ? (
          <h1 className="text-3xl m-10">No Items Available</h1>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-center m-5 border-2 border-gray-500 shadow-lg rounded"
            >
              <div>
                <img
                  className=" object-cover h-42 w-65"
                  src={`${category.imageUrl}`}
                  alt={"food"}
                />
              </div>

              <div className={!isAdmin? "content-center mb-5 w-60" : "w-60"}>
                <div className="flex justify-center  px-2">
                  <Link
                    href={`/Categories/${category.id}`}
                    className="text-3xl sm:text-5xl hover:text-destructive cursor-pointer "
                  >
                    {category.title}
                  </Link>
                </div>
                {isAdmin && (
                  <div className="mx-5">
                    <div className="flex justify-between">
                      <EditFormCate cate={category} />
                      <DeleteButton cate={category} />
                    </div>
                     <HideCategoryButton id={category.id} children={category.hiden === true ? "Unhide": "hide"}/>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Category;

