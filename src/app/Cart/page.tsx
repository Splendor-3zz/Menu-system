import EditCart from "@/components/Cart/EditCart";
import { getCartAction, userRole } from "../../../action/action";
import OrderButtonToast from "@/components/Cart/OrderButtonToast";
import type { Metadata } from "next";
import HomePage from "@/components/Home/HomePage";

export const metadata: Metadata = {
  title: "Cart",
  description: "place your order",
};

export const dynamic = "force-dynamic";

const Page = async () => {
  const cart = await getCartAction();

  if (await userRole() === "ADMIN") return <HomePage />;

  if (!cart || !cart.items.length) {
    return <h1 className="text-3xl m-10">Your cart is empty.</h1>;
  }

  const total = cart.items.reduce(
    (sum: number, cartItem : {quantity: number, item: {price: number}}) => sum + cartItem.item.price * cartItem.quantity,
    0
  );

  return (
    <div className="flex flex-col justify-center mx-10 items-center border-2 border-gray-500 p-5">
      {cart.items.map((ci : { id: string, quantity: number, item: {imageUrl: string, title: string, price: number} }) => (
        <div
          key={ci.id}
          className="border-b border-gray-600 py-2 sm:p-4 w-full flex justify-between items-center"
        >
          <div className="flex items-center space-x-4">
            <img
              src={ci.item.imageUrl}
              alt={ci.item.title}
              width={80}
              height={80}
            />
            <div>
              <h2 className="text-xl">{ci.item.title}</h2>
              <p>Price: ${ci.item.price}</p>
              <p>Total: ${ci.item.price * ci.quantity}</p>
            </div>
          </div>
          <div className="flex sm:space-x-3">
            <EditCart id={ci.id} quantity={ci.quantity} />
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
