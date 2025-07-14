'use server'

import prisma from "@/lib/prisma";
import { Project } from "@/generated/prisma";

import { z } from "zod";
import { CreateProjectSchema } from "@/lib/schema";

import { Result } from "@/lib/types";

import { revalidatePath } from "next/cache";


export async function createProjectAction(data: z.infer<typeof CreateProjectSchema>): Promise<Result<Project, string>> {
    const parsed = CreateProjectSchema.safeParse(data);
    if (!parsed.success) {
        return {
            success: false,
            error: "Invalid input data",
        };
    }

    try {
        const project = await prisma.project.create({ data });
        revalidatePath("/");
        revalidatePath(`/projects/${project.id}`);
        return {
            success: true,
            data: project
        };
    } catch (error) {
        return {
            success: false,
            error: "Failed to create project"
        };
    }
}

export async function deleteProjectAction(id: string) {
    await prisma.project.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath(`/projects/${id}`);
}