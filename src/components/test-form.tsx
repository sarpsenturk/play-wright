'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTestSchema } from "@/lib/schema";
import { useTransition } from "react";
import { createTestAction } from "@/actions/tests";

export function CreateTestForm({
    projectId,
}: {
    projectId: string;
}) {
    const form = useForm({
        resolver: zodResolver(CreateTestSchema),
        defaultValues: {
            name: "",
            filename: "",
            projectId: projectId,
        },
    });

    const [pending, startTransition] = useTransition();
    const onSubmit = form.handleSubmit((data) => {
        startTransition(async () => {
            const response = await createTestAction(data);
            if (response.success) {
                form.reset();
                alert("Test başarıyla oluşturuldu!");
            } else {
                form.setError("root", {
                    type: "manual",
                    message: response.error,
                });
            }
        });
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Test Adı</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="filename"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Dosya Adı</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <input type="hidden" name="projectId" value={projectId} />

                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.root.message}
                    </p>
                )}

                <Button type="submit" className="w-full">
                    Test Oluştur
                </Button>
            </form>
        </Form>
    )
}