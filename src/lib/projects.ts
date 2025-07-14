import { Prisma, Project } from "@/generated/prisma";
import prisma from "./prisma";

export async function getProjects(): Promise<Project[]> {
    return await prisma.project.findMany();
}

export async function getProjectById(id: string, select: Prisma.ProjectSelect) {
    return await prisma.project.findUnique({
        where: { id },
        select,
    });
}

export function projectFsName(name: string): string {
    return name.toLowerCase().split(" ").join("-");
}

export function projectTestDir(name: string): string {
    return `tests/${projectFsName(name)}`;
}