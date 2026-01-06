import {
  getAllOrdersAction,
  getCurrentUserAction,
} from "../../../action/action";
import { clerkClient } from "@clerk/nextjs/server";
import DeleteOrder from "@/components/Order/DeleteOrder";
import DoneButton from "@/components/Order/DoneButton";
import type { Metadata } from "next";

type OrderForAdminPage = {
  id: string;
  userId: string;
  createdAt: Date;
  address: string;
  phone: string;
  total: number;
  user: {
    title?: string | null;
  }
  items: Array<{
    id: string;
    quantity: number;
    price: number;
    item: {
      title: string;
    };
  }>;
};

export const metadata: Metadata = {
  title: "Orders",
};

const Page = async () => {
  const currentUser = await getCurrentUserAction();

  if (currentUser?.role !== "ADMIN") {
    return <div className="p-10 text-red-500">Access denied</div>;
  }

  const orders: OrderForAdminPage[] = await getAllOrdersAction();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {!orders.length ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-900"
              >
                <div className="sm:flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">
                    Order by: {order.user.title ?? "unkown user"}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="sm:flex justify-between items-center mb-3">
                  <h1 className="text-xl">Address: {order.address}</h1>
                  <h1 className="text-xl">Phone: {order.phone}</h1>
                </div>

                <div>
                  {order.items.map((oi) => (
                    <div
                      key={oi.id}
                      className="flex justify-between border-b py-1 text-sm"
                    >
                      <span>{oi.item.title}</span>
                      <span>
                        {oi.quantity} × ${oi.price}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mt-3 font-bold">
                  <div className="space-x-5">
                    <DeleteOrder id={order.id} />
                    <DoneButton orderItemId={order.id} id={order.id} />
                  </div>

                  Total: ${order.total.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Page;
