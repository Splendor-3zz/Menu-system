import {
  getCurrentUserAction,
  getItemsAction,
} from "../../../../action/action";
import { Button } from "@/components/ui/button";
import { Role } from "@prisma/client";
import DeleteButtonItem from "@/components/DeleteButtonItem";
import { EditFormItem } from "@/components/EditFormItem";

interface IProps {
  params: { id: string };
}

const page = async ({ params }: IProps) => {
  const { id } = await params;
  const items = await getItemsAction(id);

  const currentUser = await getCurrentUserAction();
  const isAdmin = currentUser?.role === Role.ADMIN;
  return (
    <div className="flex border-x-amber-900 border-y-amber-900 justify-start mx-10 content-center items-center border-2 border-gray-500">
      {!items.length ? (
        <h1 className="text-3xl m-10">No Items Available</h1>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            className="border-2 border-b-gray-600 m-5 p-5"
          >
            <div className="">
              <div className="w-full h-50 content-center contain-content justify-center flex">
                <img
                  src={`${item.imageUrl}`}
                  alt={"food"}
                  width={250}
                  height={250}
                />
              </div>
              <div className="">
                <h1 className="text-3xl w-50 h-20">{item.title}</h1>
                <h1>{item.price}$</h1>
                {isAdmin && (
                  <div className="w-full mt-5 flex justify-between ">
                    <EditFormItem item={item} />
                    <DeleteButtonItem item={item} />
                  </div>
                )}
                {isAdmin || <Button className="w-full mt-5">add</Button>}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default page;
