import { FlaskConical, MoreHorizontal } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem
} from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { ProjectDialog } from "./project-dialog";

import { getProjects } from "@/lib/projects";

import { deleteProjectAction } from "@/actions/projects";

import Link from "next/link";

async function ProjectsMenu() {
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction>
                                <MoreHorizontal />
                                <span className="sr-only">Aksiyonlar</span>
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                            <DropdownMenuItem variant="destructive" asChild>
                                <form action={async () => {
                                    'use server'
                                    await deleteProjectAction(project.id);
                                }}>
                                    <button type="submit" className="w-full text-left">
                                        Sil
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                    <SidebarGroupAction>
                        <ProjectDialog />
                    </SidebarGroupAction>
                    <SidebarGroupContent>
                        <ProjectsMenu />
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}