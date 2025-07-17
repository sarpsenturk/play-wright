import { RunTestBtn } from "@/components/run-text-btn";
import { CreateTestDialog } from "@/components/test-dialog";
import { ProjectTestList } from "@/components/tests";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { getProjectById, projectFsName } from "@/lib/projects";

import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Settings, Clock, FileText, Play, CheckCircle, XCircle, Calendar } from "lucide-react";

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
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Project Header */}
            <div className="relative">
                <Card className="border-l-4 border-l-primary">
                    <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Globe className="size-6 text-primary" />
                                    <CardTitle className="text-3xl font-bold">{project.name}</CardTitle>
                                </div>
                                <CardDescription className="text-base">
                                    {project.description || "Bu proje için henüz bir açıklama eklenmemiş."}
                                </CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                {project.workflow?.enabled ? (
                                    <div className="flex items-center gap-1 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                        <CheckCircle className="size-4" />
                                        <span className="text-sm font-medium">Aktif</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1 text-red-600 bg-red-50 px-3 py-1 rounded-full">
                                        <XCircle className="size-4" />
                                        <span className="text-sm font-medium">Pasif</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" size="sm" asChild>
                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="size-4" />
                                Projeyi Ziyaret Et
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Workflow Details */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Settings className="size-5 text-primary" />
                        <CardTitle className="text-xl font-semibold">Workflow Yapılandırması</CardTitle>
                    </div>
                    <CardDescription>
                        GitHub Actions ile otomatik test çalıştırma ayarları
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <FileText className="size-4" />
                                Workflow Adı
                            </div>
                            <p className="font-medium">{project.workflow?.name || "Tanımlanmamış"}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <FileText className="size-4" />
                                Workflow Dosyası
                            </div>
                            <p className="font-medium font-mono text-sm">{project.workflow?.filename || "Tanımlanmamış"}</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <Clock className="size-4" />
                                Çalışma Zamanı
                            </div>
                            <p className="font-medium font-mono text-sm">{project.workflow?.cron || "Tanımlanmamış"}</p>
                        </div>
                    </div>

                    {project.workflow?.filename && (
                        <div className="mt-6 pt-4 border-t">
                            <Button variant="outline" asChild>
                                <a href={`https://github.com/sarpsenturk/pr-test/actions/workflows/${project.workflow.filename}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <ExternalLink className="size-4" />
                                    GitHub'da Workflow'u Görüntüle
                                </a>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Tests Section */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Play className="size-5 text-primary" />
                            <CardTitle className="text-xl font-semibold">Test Yönetimi</CardTitle>
                        </div>
                        <div className="flex items-center gap-2">
                            <RunTestBtn testString={projectFsName(project.name)} />
                            <CreateTestDialog projectId={id} />
                        </div>
                    </div>
                    <CardDescription>
                        Bu proje için tanımlanmış testleri görüntüleyin, düzenleyin ve çalıştırın
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ProjectTestList id={project.id} name={project.name} />
                </CardContent>
            </Card>
        </div>
    )
}