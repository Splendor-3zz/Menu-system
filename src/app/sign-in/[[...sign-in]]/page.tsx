import { SignIn } from '@clerk/nextjs'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export default async function Page() {
  return (
    <div className='flex justify-center items-center h-screen'>
      <SignIn  afterSignInUrl={"/"} />
    </div>
  )
}