'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTestSchema } from "@/lib/schema";
import { useState, useTransition } from "react";
import { createTestAction } from "@/actions/tests";
import { Switch } from "./ui/switch";

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
            viewport: undefined,
            input: undefined,
        },
    });

    // Emulation settings
    const [emulateViewport, setEmulateViewport] = useState(false);

    const [pending, startTransition] = useTransition();
    const onSubmit = form.handleSubmit((data) => {
        // Append .spec.ts to filename if not present
        if (!data.filename.endsWith(".spec.ts")) {
            data.filename += ".spec.ts";
        }

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
                                <div className="flex items-center gap-2">
                                    <Input {...field} />
                                    <span className="text-sm text-muted-foreground">.spec.ts</span>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex items-center gap-2">
                    <Switch
                        checked={emulateViewport}
                        onCheckedChange={(checked) => {
                            setEmulateViewport(checked);
                            if (!checked) {
                                form.setValue("viewport", undefined);
                            } else {
                                form.setValue("viewport", "800,600"); // Default emulated viewport size
                            }
                            console.log(form.getValues("viewport"));
                        }}
                    />
                    <span className="text-sm" title="Viewport'u taklit et">Viewport&apos;u taklit et</span>
                </div>
                <FormField
                    control={form.control}
                    name="viewport"
                    disabled={!emulateViewport}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Viewport Boyutu</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value} placeholder="Viewport Boyutu" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Girdi (Opsiyonel)</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="input.json" />
                            </FormControl>
                            <FormDescription>
                                Test için opsiyonel input dosyası
                                <br />
                                <b>Bu dosya test koduyla aynı klasörde olmalıdır.</b>
                            </FormDescription>
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

                <Button type="submit" className="w-full" disabled={pending}>
                    Test Oluştur
                </Button>
            </form>
        </Form>
    )
}