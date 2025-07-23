import { MoreHorizontal, Play, Trash, Video } from "lucide-react";

import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";

import { getTestsForProject } from "@/lib/test";
import { codegenAction, deleteTestAction, execTestAction } from "@/actions/tests";
import { InputDialog } from "./input-dialog";

export async function ProjectTestList({
    id,
    name,
}: {
    id: string;
    name: string;
}) {
    const tests = await getTestsForProject(id);
    if (tests.length === 0) {
        return <p className="text-muted-foreground">Bu proje için test bulunamadı.</p>;
    } else {
        return (
            <ul className="space-y-2">
                {tests.map((test) => (
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
                                    <form action={async () => {
                                        'use server'
                                        await execTestAction(test.filename);
                                    }}>
                                        <DropdownMenuItem asChild>
                                            <button type="submit" className="w-full text-left">
                                                <Play />
                                                Çalıştır
                                            </button>
                                        </DropdownMenuItem>
                                    </form>
                                    <form action={async () => {
                                        'use server'
                                        await codegenAction(test.id);
                                    }}>
                                        <DropdownMenuItem asChild>
                                            <button type="submit" className="w-full text-left">
                                                <Video />
                                                Codegen
                                            </button>
                                        </DropdownMenuItem>
                                    </form>
                                    <DropdownMenuSeparator />
                                    <form action={async () => {
                                        'use server'
                                        await deleteTestAction(name, test.id);
                                    }}>
                                        <DropdownMenuItem variant="destructive" asChild>
                                            <button type="submit" className="w-full text-left">
                                                <Trash />
                                                Sil
                                            </button>
                                        </DropdownMenuItem>
                                    </form>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <p className="text-sm text-muted-foreground">{test.filename}</p>
                        {test.viewport && (
                            <p className="text-xs text-muted-foreground">
                                Viewport: {test.viewport}
                            </p>
                        )}
                        {test.input && (
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-muted-foreground">
                                    Input: {test.input}
                                </p>
                                <InputDialog />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        )
    }
}