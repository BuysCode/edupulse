"use client"

import ThemeToggleButton from "./ThemeToggleButton";

export default function Header() {
  return (
    <header className="sticky top-0 flex h-20 w-full items-center justify-between border-b border-gray-300 bg-white px-4 text-gray-800 shadow-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold text-vibe-700 dark:text-vibe-500">Vibe Escolar</h1>

      <ThemeToggleButton />
    </header>
  );
}