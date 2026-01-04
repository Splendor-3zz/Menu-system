import { NavigationMenuDemoTwo } from "@/components/Headers/NavigationMenuTwo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drag And Drop",
};

interface IProps {
  children: React.ReactNode;
}

const layout = ({ children }: IProps) => {
  return (
    <div>
      <NavigationMenuDemoTwo />
      {children}
    </div>
  );
};

export default layout;
