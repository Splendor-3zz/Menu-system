import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Header from "./Header";
import { DropdownMenuRadioGroupDemo2 } from "./NavDropDown";
import { Cart } from "./Cart.";
import { Add } from "./Add";

const Nav = () => {
  return (
    <nav className="flex justify-between m-5">
      <div className="flex gap-1">
      <ModeToggle />
      <div className="sm:hidden">
        <DropdownMenuRadioGroupDemo2 />
      </div>
      </div>
      <div>
        <div className="hidden sm:block">
          <Header />
        </div>
      </div>
      <div className="flex gap-1">
        <div className="sm:hidden">
          <Cart/>
          <Add/>
        </div>
        <div className="pt-1">
          <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
