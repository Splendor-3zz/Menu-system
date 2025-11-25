import {
  getAllOrdersAction,
  getCurrentUserAction,
} from "../../../action/action";
import { Role } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";
import DeleteOrder from "@/components/Order/DeleteOrder";
import DoneButton from "@/components/Order/DoneButton";

const Page = async () => {
  const currentUser = await getCurrentUserAction();

  if (currentUser?.role !== Role.ADMIN) {
    return <div className="p-10 text-red-500">Access denied</div>;
  }

  const orders = await getAllOrdersAction();

  // Fetch all Clerk users in ONE batched request
  const userIds = [...new Set(orders.map((o) => o.userId))];

  const client = await clerkClient();
  const users = await client.users.getUserList({
    userId: userIds,
    limit: userIds.length,
  });

  // Make a lookup map for fast access
  const userMap = new Map(users.data.map((u) => [u.id, u]));

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>

      {!orders.length ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const user = userMap.get(order.userId);

            return (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-900"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold">
                    Order by{" "}
                    {user
                      ? user.emailAddresses[0]?.emailAddress
                      : "Unknown User"}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
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
