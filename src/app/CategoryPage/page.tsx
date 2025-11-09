import Link from "next/link";
import {
  getCategoriesAction,
  getCurrentUserAction,
} from "../../../action/action";
import DeleteButton from "@/components/DeleteButton";
import { EditFormCate } from "@/components/EditFormCate";
import { Role } from "@prisma/client";

const Category = async () => {
  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;

  const categories = await getCategoriesAction();

  return (
    <div>
      <div className="flex flex-col justify-center mx-10  content-center items-center border-2 border-gray-500 ">
        {!categories.length ? (
          <h1 className="text-3xl m-10">Noo Items Available</h1>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex justify-center m-5 contain-content border-2 border-gray-500 h-40  hover:mask-y-from-45"
            >
              <div>
                <img
                  src={`${category.imageUrl}`}
                  alt={"food"}
                  width={300}
                  height={300}
                />
              </div>

              <div className="content-center space-x-3 w-75">
                <div className="flex justify-center hover:text-orange-400 px-2">
                  <Link
                    href={`/CategoryPage/${category.id}`}
                    className="text-5xl hover:text-6xl cursor-pointer"
                  >
                    {category.title}
                  </Link>
                </div>
                {isAdmin && (
                  <div className="flex justify-around">
                    <EditFormCate cate={category} />
                    <DeleteButton cate={category} />
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
