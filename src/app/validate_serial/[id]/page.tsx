import { ValidateProductSerialPageComponent } from "@/components/auth/ValidateProductSerialPageComponent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ValidateProductSerialPage({ params }: PageProps) {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  const { id } = await params

  if (!session) {
    return redirect("/signin")
  }

  return (
    <div className="flex items-center bg-gray-200 dark:bg-gray-950 justify-center w-full h-screen">
      <ValidateProductSerialPageComponent id={id} />
    </div>
  )
}