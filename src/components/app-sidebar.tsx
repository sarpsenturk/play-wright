import { FlaskConical } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { getProjects } from "@/lib/projects";
import Link from "next/link";

async function ProjecstMenu() {
    const projects = await getProjects();
    return (
        <SidebarMenu>
            {projects.map((project) => (
                <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton asChild>
                        <Link href={`/projects/${project.id}`}>
                            {project.name}
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    )
}

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="flex items-center gap-2 px-4 py-2">
                    <FlaskConical className="h-6 w-6" />
                    <span title="PR Test" className="text-lg font-semibold">PR Test</span>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Projeler</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <ProjecstMenu />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}