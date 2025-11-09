import { SignIn } from '@clerk/nextjs'
import { getUsersAction } from '../../../../action/action';

export default async function Page() {
  return <SignIn  afterSignInUrl={"/"} />
}