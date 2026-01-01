import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { ModeToggle } from "../header/ModeToggle"
import { Button } from "./button"

const Nav = () => {
    return(
        <nav className="flex justify-between m-5">
            <ModeToggle/>
            <div>
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </nav>
        )
}

export default Nav