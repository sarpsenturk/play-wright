import { Project } from "@/generated/prisma";
import prisma from "./prisma";

export async function getProjects(): Promise<Project[]> {
    return await prisma.project.findMany();
}

export async function getProjectById(id: string): Promise<Project | null> {
    return await prisma.project.findUnique({
        where: { id },
    });
}