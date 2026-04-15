"use client"

import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarMenuItem, SidebarMenu, SidebarProvider } from "@/components/ui/sidebar";
import SignOutButton from "../SignOutButton";

export default function StudentAndParentSidebar() {
    return (
        <Sidebar className="bg-gray-950 border-r border-r-gray-600">
            <SidebarHeader className="bg-gray-900 h-20 flex items-center justify-center px-0 border-b border-b-gray-600">
                <h1>Menu do Aluno</h1>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem></SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SignOutButton />
            </SidebarFooter>
        </Sidebar>
    )
}