import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";
import Header from "./Header";
import { DropdownMenuRadioGroupDemo2 } from "./NavDropDown";

const Nav = () => {
  return (
    <nav className="flex justify-between m-5">
      <ModeToggle />
      <div>
        <div className="sm:hidden flex justify-center">
          <DropdownMenuRadioGroupDemo2 />
        </div>
        <div className="hidden sm:block">
          <Header />
        </div>
      </div>
      <div>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </nav>
  );
};

export default Nav;
