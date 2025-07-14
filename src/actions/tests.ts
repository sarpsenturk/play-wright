'use server'

import { z } from "zod";
import { CreateTestSchema } from "@/lib/schema";

import { Result } from "@/lib/types";
import { Test } from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestAction(data: z.infer<typeof CreateTestSchema>): Promise<Result<Test, string>> {
    const parsed = CreateTestSchema.safeParse(data);
    if (!parsed.success) {
        return {
            success: false,
            error: "Invalid input data",
        };
    }

    const { name, filename, projectId } = parsed.data;
    try {
        const newTest = await prisma.test.create({
            data: {
                name,
                filename,
                project: {
                    connect: { id: projectId },
                },
            },
        });
        revalidatePath(`/projects/${projectId}`);
        return {
            success: true,
            data: newTest,
        };
    } catch (error) {
        // TODO: Handle Prisma errors
        return {
            success: false,
            error: "Failed to create test",
        };
    }
}