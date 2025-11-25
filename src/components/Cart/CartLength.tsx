import { cartItemsAction } from "../../../action/action";

const CartLength = async () => {
  const carts = await cartItemsAction();
  return <div className="text-red-500 pl-1">{carts}</div>;
};

export default CartLength;
