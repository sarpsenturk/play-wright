'use client'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProjectSchema } from "@/lib/schema";

import { CronInput } from "./cron-input";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

import { useTransition } from "react";
import { createProjectAction } from "@/actions/projects";
import { projectFsName } from "@/lib/projects";

export function ProjectForm() {
    const form = useForm({
        resolver: zodResolver(CreateProjectSchema),
        defaultValues: {
            name: "",
            url: "",
            description: undefined,
            workflowName: "",
            workflowFilename: "",
            workflowCron: "0 0 * * *", // Default to daily at midnight
        },
    });

    const [pending, startTransition] = useTransition();

    const onSubmit = form.handleSubmit((data) => {
        // Append .yml to the workflow filename if not already present
        if (!data.workflowFilename.endsWith(".yml")) {
            data.workflowFilename += ".yml";
        }

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
                                <Input
                                    {...field}
                                    placeholder="Projenin tanımlayıcı adı"
                                    onBlur={(e) => {
                                        const fsname = projectFsName(e.target.value);
                                        // Automatically set the workflow name & filename based on the project name
                                        if (!form.getValues("workflowName")) {
                                            form.setValue("workflowName", fsname);
                                        }
                                        if (!form.getValues("workflowFilename")) {
                                            form.setValue("workflowFilename", fsname);
                                        }
                                    }}
                                />
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
                                <Input {...field} placeholder="Test edilecek URL" />
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
                                <Textarea {...field} className="resize-none" placeholder="Projeyle ilgili açıklama/notlar" />
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

                <FormField
                    control={form.control}
                    name="workflowName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Workflow Adı</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Workflow adı" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="workflowFilename"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Workflow Dosya Adı</FormLabel>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Input {...field} placeholder="Workflow dosya adı" />
                                    <span className="text-gray-500">.yml</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="workflowCron"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Workflow Periyodu</FormLabel>
                            <FormControl>
                                <CronInput onChange={field.onChange} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={pending}>
                    Projeyi Ekle
                </Button>
            </form>
        </Form>
    )
}