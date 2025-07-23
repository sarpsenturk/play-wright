'use server'

import { z } from "zod";
import { CreateTestSchema, InputSchema } from "@/lib/schema";

import { Result } from "@/lib/types";
import { projectTestDir } from "@/lib/projects";

import { Test } from "@/generated/prisma";
import prisma from "@/lib/prisma";

import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import * as fs from "fs/promises";
import * as path from "node:path";
import { exec } from "node:child_process";
import { wrapTestWithParams } from "@/lib/morph";

export async function createTestAction(data: z.infer<typeof CreateTestSchema>): Promise<Result<Test, string>> {
    const parsed = CreateTestSchema.safeParse(data);
    if (!parsed.success) {
        return {
            success: false,
            error: "Invalid input data",
        };
    }

    const { name, filename, viewport, input, projectId } = parsed.data;
    try {
        const newTest = await prisma.test.create({
            data: {
                name,
                filename,
                viewport,
                input,
                project: {
                    connect: { id: projectId },
                },
            },
        });
        revalidatePath(`/${projectId}`);
        return {
            success: true,
            data: newTest,
        };
    } catch {
        return {
            success: false,
            error: "Failed to create test",
        };
    }
}

export async function deleteTestAction(projectName: string, testId: string) {
    const deletedTest = await prisma.test.delete({ where: { id: testId } });
    const filepath = path.join(projectTestDir(projectName), deletedTest.filename);
    await fs.rm(filepath, { force: true }); // force: true to ignore if file does not exist
    revalidatePath(`/${deletedTest.projectId}`);
}

export async function codegenAction(testId: string) {
    const test = await prisma.test.findUnique({
        where: { id: testId },
        select: {
            filename: true,
            viewport: true,
            input: true,
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
    let command = `pnpm exec playwright codegen --output ${filepath} ${test.project.url}`;
    if (test.viewport) {
        command += ` --viewport-size="${test.viewport}"`;
    }
    exec(command,
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
        })
        .on('exit', (code) => {
            // Wrap the test with parameters if input is provided
            if (code === 0 && test.input) {
                wrapTestWithParams(filepath, test.input);
            }
        }
        );
}

export async function execTestAction(testString: string) {
    exec(`pnpm exec playwright test --ui ${testString}`);
}

export async function setInputFileAction(data: z.infer<typeof InputSchema>): Promise<Result<void, string>> {
    const parsed = InputSchema.safeParse(data);
    if (!parsed.success) {
        return { success: false, error: "Invalid input data" };
    }

    const test = await prisma.test.update({
        where: { id: parsed.data.testId },
        data: { input: parsed.data.file!.name },
        select: {
            input: true,
            project: {
                select: { id: true, name: true }
            },
        },
    });
    if (!test) {
        return { success: false, error: "Test not found" };
    }

    const dir = projectTestDir(test.project.name);
    const filepath = path.join(dir, test.input!);

    // Ensure the directory exists
    await fs.mkdir(dir, { recursive: true });

    // Write the input file to the test directory
    await fs.writeFile(filepath, await parsed.data.file!.text());

    revalidatePath(`/${test.project.id}`);
    return { success: true, data: undefined };
}