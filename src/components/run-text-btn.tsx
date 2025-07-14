'use client'

import { execTestAction } from "@/actions/tests";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

export function RunTestBtn({
    testString,
}: {
    testString: string;
}) {
    const [pending, startTransition] = useTransition();
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            await execTestAction(testString);
        });
    };

    return (
        <form onSubmit={onSubmit}>
            <Button type="submit" variant="ghost" size="icon" className="text-green-500" disabled={pending}>
                <Play className="h-4 w-4" />
            </Button>
        </form>
    )
}