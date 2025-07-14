import { getTestsForProject } from "@/lib/test";

export async function ProjectTestList({
    projectId,
}: {
    projectId: string;
}) {
    const projects = await getTestsForProject(projectId);
    if (projects.length === 0) {
        return <p className="text-muted-foreground">No tests found for this project.</p>;
    } else {
        return (
            <ul className="space-y-2">
                {projects.map((test) => (
                    <li key={test.id} className="p-4 border rounded-md">
                        <h3 className="text-lg font-semibold">{test.name}</h3>
                        <p className="text-sm text-muted-foreground">{test.filename}</p>
                    </li>
                ))}
            </ul>
        )
    }
}