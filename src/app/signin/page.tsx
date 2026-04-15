import { SignInPageComponent } from "@/components/auth/SignInPageComponent";
import { getSession } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getSession({
    headers: await headers()
  });

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-950 justify-center w-full h-screen">
      <SignInPageComponent />
    </div>
  )
}