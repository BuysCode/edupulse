import Header from "@/components/header"

export default function HomePage() {
  return (
    <div suppressHydrationWarning>
      <Header />
      <div className="bg-gray-200 dark:bg-gray-950 h-screen">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Bem-vindo ao Vibe Escolar!
        </h2>
      </div>
    </div>
  );
}