import { RunTestBtn } from "@/components/run-text-btn";
import { CreateTestDialog } from "@/components/test-dialog";
import { ProjectTestList } from "@/components/tests";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getProjectById, projectFsName } from "@/lib/projects";

import { notFound } from "next/navigation";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const project = await getProjectById(id);
    if (project === null) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <Card>
                <CardContent>
                    <h1 className="text-2xl font-bold">{project.name}</h1>
                    <a href={project.url} target="_blank" className="text-sm text-muted-foreground hover:underline">{project.url}</a>
                    {project.description && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {project.description}
                        </p>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">Testler</h2>
                        <div className="flex items-center space-x-0.5">
                            <RunTestBtn testString={projectFsName(project.name)} />
                            <CreateTestDialog projectId={id} />
                        </div>
                    </div>
                    <Separator className="mb-4 mt-2" />

                    <ProjectTestList id={project.id} name={project.name} />
                </CardContent>
            </Card>
        </div>
    )
}