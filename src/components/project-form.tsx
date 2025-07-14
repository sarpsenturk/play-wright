'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectSchema } from "@/lib/schema";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { useTransition } from "react";
import { createProjectAction } from "@/actions/projects";

export function ProjectForm() {
    const form = useForm({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            url: "",
            description: undefined,
        },
    });

    const [pending, startTransition] = useTransition();

    const onSubmit = form.handleSubmit((data) => {
        startTransition(async () => {
            const response = await createProjectAction(data);
            if (response.success) {
                form.reset();
                alert("Proje başarıyla eklendi!");
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
                            <FormLabel>Proje Adı</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Proje URL</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Açıklama</FormLabel>
                            <FormControl>
                                <Textarea {...field} className="resize-none" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {form.formState.errors.root && (
                    <p className="text-red-500 text-sm">
                        {form.formState.errors.root.message}
                    </p>
                )}

                <Button type="submit" className="w-full" disabled={pending}>
                    Projeyi Ekle
                </Button>
            </form>
        </Form>
    )
}