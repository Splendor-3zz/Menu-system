import { SignUp } from '@clerk/nextjs'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignUp afterSignUpUrl={"/"} />
    </div>
  )
}