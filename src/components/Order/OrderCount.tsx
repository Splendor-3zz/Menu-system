import { getAllOrdersAction } from "../../../action/action";

const OrderCount = async () => {
  const orderCount = await getAllOrdersAction();
  return <div className="text-red-500 ml-1">{orderCount.length}</div>;
};

export default OrderCount;
