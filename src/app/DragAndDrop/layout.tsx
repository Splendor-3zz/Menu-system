import { NavigationMenuDemoTwo } from "@/components/Headers/NavigationMenuTwo";
import type { Metadata } from "next";
import { getCurrentUserAction } from "../../../action/action";

export const metadata: Metadata = {
  title: "Drag And Drop",
};

interface IProps {
  children: React.ReactNode;
}

const layout = async ({ children }: IProps) => {
  const user = await getCurrentUserAction();
    if (user?.role !== "ADMIN") return <div>Access denied</div>;
  return (
    <div>
      <NavigationMenuDemoTwo />
      {children}
    </div>
  );
};

export default layout;
