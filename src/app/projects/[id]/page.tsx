import { Card, CardContent } from "@/components/ui/card";
import { getProjectById } from "@/lib/projects";
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
        <div className="max-w-4xl mx-auto">
            <Card>
                <CardContent>
                    <h1 className="text-2xl font-bold">{project.name}</h1>
                    <a href={project.url} className="text-sm text-muted-foreground hover:underline">{project.url}</a>
                    {project.description && (
                        <p className="mt-2 text-sm text-muted-foreground">
                            {project.description}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}