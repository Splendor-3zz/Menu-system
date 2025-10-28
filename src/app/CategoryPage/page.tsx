import Link from "next/link"
import { getCategoriesAction } from "../../../action/action";
import { Role } from "@prisma/client";
import EditButton from "@/components/EditButton";
import DeleteButton from "@/components/DeleteButton";
import AddButton from "@/components/AddButton";


const Category = async () => {

    const admin=Role.ADMIN;
    const categories = await getCategoriesAction();
    return(
        <div>  
            <div className="flex flex-col justify-center mx-10  content-center items-center border-2 border-gray-500 ">
                {categories.map(category => (
                    <Link key={category.id} className="flex justify-center m-5 contain-content border-2 border-gray-500 cursor-pointer h-40  hover:mask-y-from-45" href={`/CategoryPage/${category.id}`}>

                        <div>
                            <img src={`${category.imageUrl}`} alt={"food"} width={300} height={300} />
                        </div>

                        <div className="content-center space-x-3">
                            <h1 className="text-5xl w-70 text-center">{category.title}</h1>
                            
                            <div className="flex justify-around">
                                {admin && <EditButton />}
                                {admin && <DeleteButton />}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        )
}

export default Category