import EditCart from "@/components/Cart/EditCart";
import { getCartAction } from "../../../action/action";
import OrderButtonToast from "@/components/Cart/OrderButtonToast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "place your order",
};

export const dynamic = "force-dynamic";

const Page = async () => {
  const cart = await getCartAction();

  if (!cart || !cart.items.length) {
    return <h1 className="text-3xl m-10">Your cart is empty.</h1>;
  }

  const total = cart.items.reduce(
    (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
    0
  );

  return (
    <div className="flex flex-col justify-center mx-10 items-center border-2 border-gray-500 p-5">
      {cart.items.map(({ id, item, quantity }) => (
        <div
          key={id}
          className="border-b border-gray-600 p-4 w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <img
              src={item.imageUrl}
              alt={item.title}
              width={100}
              height={100}
            />
            <div>
              <h2 className="text-xl">{item.title}</h2>
              <p>Price: ${item.price}</p>
              <p>Total: ${item.price * quantity}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <EditCart id={id} quantity={quantity} />
          </div>
        </div>
      ))}

      <div className="mt-5 text-2xl font-semibold">
        Total: ${total.toFixed(2)}
      </div>
      <OrderButtonToast />
    </div>
  );
};

export default Page;
