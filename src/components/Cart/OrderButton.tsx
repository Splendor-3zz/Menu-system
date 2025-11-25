import { toast } from "sonner";
import { placeOrderAction } from "../../../action/action";
import { Button } from "../ui/button";
import OrderButtonToast from "./OrderButtonToast";

const OrderButton = async () => {
  async function handleOrder() {
    "use server";
    await placeOrderAction();
  }

  return (
    <form action={handleOrder}>
      <OrderButtonToast />
    </form>
  );
};

export default OrderButton;
