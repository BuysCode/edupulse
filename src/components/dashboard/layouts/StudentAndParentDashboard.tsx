"use client"
import Header from "@/components/header";
import StudentAndParentSidebar from "../navigation/StudentAndParentSidebar";

export default function StudentAndParentDashboard() {
    return (
        <div className="flex w-screen">
            <StudentAndParentSidebar />
            <main className="flex-1 w-[80%]">
                <Header />
                <div className="p-4">
                    <h1>Bem vindo(a)!</h1>
                </div>
            </main>
        </div>
    )
}