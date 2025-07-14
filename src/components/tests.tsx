import { MoreHorizontal } from "lucide-react";

import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

import { getTestsForProject } from "@/lib/test";
import { deleteTestAction } from "@/actions/tests";

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
                    <li key={test.id} className="rounded-md">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold">{test.name}</h3>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <MoreHorizontal />
                                        <span className="sr-only">More options</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <form>
                                            <button type="submit" className="w-full text-left">
                                                Codegen
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive" asChild>
                                        <form action={async () => {
                                            'use server'
                                            const result = await deleteTestAction(test.id);
                                        }}>
                                            <button type="submit" className="w-full text-left">
                                                Delete
                                            </button>
                                        </form>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground">{test.filename}</p>
                    </li>
                ))}
            </ul>
        )
    }
}