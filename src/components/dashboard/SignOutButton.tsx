"use client";

import { DoorOpen } from "lucide-react";
import { Button } from "../ui/button";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
    return (
        <Button onClick={() => signOut({
            fetchOptions: {
                onSuccess: () => {
                    window.location.href = "/signin" // redirect on signout
                }
            }
        })} className="flex flex-row gap-4">
            <DoorOpen />
            <h1>Sair da conta</h1>
        </Button>
    )
}