import { NavigationMenuDemoTwo } from "@/components/Headers/NavigationMenuTwo";

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
