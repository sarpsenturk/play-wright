'use server'

import prisma from "@/lib/prisma";
import { Project } from "@/generated/prisma";

import { z } from "zod";
import { CreateProjectSchema } from "@/lib/schema";

import { Result } from "@/lib/types";

import { revalidatePath } from "next/cache";

import * as fs from "fs/promises";
import * as path from "path";
import { projectFsName } from "@/lib/projects";
import { permanentRedirect } from "next/navigation";

function generateWorkflowYaml(name: string, cron: string) {
  return `name: ${name}
on:
  schedule:
    - cron: '${cron}'
  workflow_dispatch:

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Install pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 10
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
        cache: 'pnpm'
    - name: Install dependencies
      run: pnpm install
    - name: Install Playwright Browsers
      run: pnpm exec playwright install --with-deps
    - name: Run Playwright tests
      run: pnpm exec playwright test ${projectFsName(name)}
    - uses: actions/upload-artifact@v4
      if: \${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30`
}


export async function createProjectAction(data: z.infer<typeof CreateProjectSchema>): Promise<Result<Project, string>> {
  const parsed = CreateProjectSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input data",
    };
  }

  try {
    // Insert the project into the database
    const project = await prisma.project.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description,
        url: parsed.data.url,
        workflow: {
          create: {
            name: parsed.data.workflowName,
            filename: parsed.data.workflowFilename
          }
        }
      }
    });

    // Create the workflow file in the filesystem
    const workflowContent = generateWorkflowYaml(project.name, parsed.data.workflowCron);
    const workflowPath = path.join(".github", "workflows", projectFsName(project.name) + ".yml");

    await fs.mkdir(path.dirname(workflowPath), { recursive: true });
    await fs.writeFile(workflowPath, workflowContent);

    revalidatePath("/");
    revalidatePath(`/${project.id}`);
    return {
      success: true,
      data: project
    };
  } catch {
    return {
      success: false,
      error: "Failed to create project"
    };
  }
}

export async function deleteProjectAction(id: string) {
  const project = await prisma.project.delete({ where: { id } });
  const fsname = projectFsName(project.name);
  await fs.rm(path.join(".github", "workflows", fsname + ".yml"));
  await fs.rm(path.join("tests", fsname), { recursive: true, force: true });

  revalidatePath("/");
  permanentRedirect("/");
}