import { Theme } from "@/types";
import { Moon, Sun } from "lucide-react";

export default function ThemeIcon({ theme }: { theme: Theme }) {
    return (
        <>
            {theme === "light" ? <Moon className="h-8 w-8" /> : <Sun className="w-8 h-8" />}
        </>
    )
}