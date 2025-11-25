import EditCart from "@/components/Cart/EditCart";
import { getCartAction } from "../../../action/action";
import {
  incrementCartItemAction,
  decrementCartItemAction,
} from "../../../action/action";
import { Button } from "@/components/ui/button";
import DeleteFromCart from "@/components/Cart/DeleteFromCart";
import OrderButton from "@/components/Cart/OrderButton";

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
            <DeleteFromCart id={id} />
          </div>
        </div>
      ))}

      <div className="mt-5 text-2xl font-semibold">
        Total: ${total.toFixed(2)}
      </div>
      <OrderButton />
    </div>
  );
};

export default Page;
