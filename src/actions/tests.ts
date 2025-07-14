'use server'

import { z } from "zod";
import { CreateTestSchema } from "@/lib/schema";

import { Result } from "@/lib/types";
import { projectTestDir } from "@/lib/projects";

import { Test } from "@/generated/prisma";
import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import * as fs from "fs/promises";
import * as path from "node:path";
import { exec } from "node:child_process";

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

export async function deleteTestAction(testId: string) {
    const deletedTest = await prisma.test.delete({
        where: { id: testId },
    });
    revalidatePath(`/projects/${deletedTest.projectId}`);
}

export async function codegenAction(testId: string) {
    const test = await prisma.test.findUnique({
        where: { id: testId },
        select: {
            filename: true,
            project: {
                select: {
                    id: true,
                    name: true,
                    url: true,
                },
            },
        }
    });
    if (!test) {
        notFound();
    }

    // Create project test directory if it doesn't exist
    const dir = projectTestDir(test.project.name);
    await fs.mkdir(dir, { recursive: true });

    // Set test file path
    const filepath = path.join(dir, test.filename);

    // Execute playwrihght codegen command
    exec(`pnpm exec playwright codegen --output ${filepath} ${test.project.url}`,
        {},
        (error, stdout, stderr) => {
            if (stdout) {
                console.log(`Codegen output: ${stdout}`);
            }
            if (stderr) {
                console.error(`Codegen error: ${stderr}`);
            }
            if (error) {
                console.error(`Error during codegen: ${error.message}`);
            }
        });
}

export async function execTestAction(testString: string) {
    const result = exec(`pnpm exec playwright test --ui ${testString}`);
}