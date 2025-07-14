import prisma from "./prisma";

export async function getTestsForProject(projectId: string) {
    const tests = await prisma.test.findMany({
        where: { projectId },
    });
    return tests;
}
