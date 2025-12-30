import HomePage from "@/components/HomePage";
import Header from "@/components/Header";
import { DropdownMenuRadioGroupDemo2 } from "@/components/NavDropDown";

export default async function Home() {  
  return (
    <div>
      <div>
        <div className="sm:hidden flex justify-center">
        <DropdownMenuRadioGroupDemo2/>
        </div>
        <div className="hidden sm:block">
        <Header />
        </div>
      </div>
      <HomePage />
    </div>
  );
}
