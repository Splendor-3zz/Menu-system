"use client";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface IProps {}

const OrderButtonToast = ({}: IProps) => {
  return (
    <Button
      className="mt-5 bg-green-500 hover:bg-green-400 cursor-pointer"
      onClick={() => toast.success("Your have orderd successfully.")}
    >
      Place Order
    </Button>
  );
};

export default OrderButtonToast;
