import {
  getAdminItemsAction,
  getCurrentUserAction,
  getItemsAction,
} from "../../../../action/action";
import { Role } from "@prisma/client";
import DeleteButtonItem from "@/components/Items/DeleteButtonItem";
import { EditFormItem } from "@/components/Items/EditFormItem";
import { AddToCartButton } from "@/components/Items/AddToCartButton";
import HideItemButton from "@/components/Items/HideItemButton";

interface IProps {
  params: { id: string };
}

const page = async ({ params }: IProps) => {
  const { id } = await params;
  
  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;

  const userItems = await getItemsAction(id)
  const adminItems = await getAdminItemsAction(id)
  const items = isAdmin ? adminItems : userItems;
  return (
    <div className="flex flex-wrap justify-center border-x-amber-900 border-y-amber-900 gap-4 mx-10 border-2 border-gray-500">
      {!items.length ? (
        <h1 className="text-3xl m-10">No Items Available</h1>
      ) : (
        items.map((item) => (
          <div key={item.id} className="border-2 border-b-gray-600 m-4 p-4">
            <div className="">
              <div className="flex justify-center w-full h-50 content-center object-cover">
                <img src={`${item.imageUrl}`} alt={"food"} />
              </div>
              <div className="">
                <h1 className="text-3xl w-50 h-20">{item.title}</h1>
                <h1>Price: {item.price}$</h1>
                {isAdmin && (
                  <div>
                    <h1>No of Orders: {item.noOfOrders}</h1>
                    <div className="w-full mt-5 flex justify-between ">
                      <EditFormItem item={item} />
                      <DeleteButtonItem item={item} />
                    </div>
                    <HideItemButton id={item.id} children={item.hiden === true ? "Unhide": "hide"}/>
                  </div>
                )}
                {isAdmin || <AddToCartButton id={item.id} />}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default page;
