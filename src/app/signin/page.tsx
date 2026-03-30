import { SignInPageComponent } from "@/components/auth/SignInPageComponent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  // const cookiesList = await cookies()
  // const backendUrl = process.env.BACKEND_URL!
  
  // const requestUser = await fetch(`${backendUrl}/profile`, {
  //   headers: {
  //     cookie: cookiesList.toString(),
  //   },
  //   cache: 'no-store',
  //   credentials: 'include',
  // })
  
  // if (requestUser.ok) {
  //   return redirect('/dashboard')
  // }

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-950 justify-center w-full h-screen">
      <SignInPageComponent />
    </div>
  )
}