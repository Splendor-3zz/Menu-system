import Header from "@/components/Header";
import { DropdownMenuRadioGroupDemo2 } from "@/components/NavDropDown";

interface IProps {
  children: React.ReactNode;
}

const layout = ({ children }: IProps) => {
  return (
    <div>
      <div>
        <div className="sm:hidden flex justify-center">
          <DropdownMenuRadioGroupDemo2 />
        </div>
        <div className="hidden sm:block">
          <Header />
        </div>
      </div>
      {children}
    </div>
  );
};

export default layout;
