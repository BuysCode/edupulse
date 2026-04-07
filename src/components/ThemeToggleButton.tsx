"use client"

import { useEffect, useState } from "react"
import {
  useTheme,
} from "next-themes"

import { Button } from "./ui/button"
import ThemeIcon from "./ThemeIcon"
import { Theme } from "@/types"

export default function ThemeToggleButton() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = resolvedTheme === "dark"

  return (
    <Button
      className="rounded-md bg-gray-200 p-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 cursor-pointer"
      onClick={() => mounted && setTheme(isDark ? "light" : "dark")}
      type="button"
      aria-label="Alternar tema"
    >
      <ThemeIcon theme={theme as Theme} />
    </Button>
  )
}