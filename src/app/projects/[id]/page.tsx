import { RunTestBtn } from "@/components/run-text-btn";
import { CreateTestDialog } from "@/components/test-dialog";
import { ProjectTestList } from "@/components/tests";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { getProjectById, projectFsName } from "@/lib/projects";

import { notFound } from "next/navigation";

import clsx from "clsx";

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const project = await getProjectById(id, {
        name: true,
        url: true,
        description: true,
        workflow: {
            select: {
                name: true,
                filename: true,
                enabled: true,
                cron: true,
            },
        },
    });
    if (project === null) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">{project.name}</CardTitle>
                    <CardDescription>{project.description || "Proje açıklaması yok."}</CardDescription>
                </CardHeader>
                <CardContent>
                    <a href={project.url} target="_blank" className="text-sm text-muted-foreground hover:underline">{project.url}</a>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">Workflow</CardTitle>
                        <span className={clsx(
                            "text-sm",
                            project.workflow?.enabled ? "text-green-500" : "text-red-500"
                        )}>
                            {project.workflow?.enabled ? "Aktif" : "Aktif Değil"}
                        </span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <span title="Workflow Name" className="flex items-center gap-2">
                            Workflow Adı:
                            <p className="text-sm text-muted-foreground">{project.workflow?.name}</p>
                        </span>
                        <span title="Workflow Filename" className="flex items-center gap-2">
                            Workflow Dosyası:
                            <p className="text-sm text-muted-foreground">{project.workflow?.filename}</p>
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold">Testler</CardTitle>
                        <div className="flex items-center space-x-0.5">
                            <RunTestBtn testString={projectFsName(project.name)} />
                            <CreateTestDialog projectId={id} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ProjectTestList id={project.id} name={project.name} />
                </CardContent>
            </Card>
        </div>
    )
}