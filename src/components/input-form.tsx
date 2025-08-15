'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputSchema } from "@/lib/schema";
import { useTransition } from "react";
import { setInputFileAction } from "@/actions/tests";

export function InputForm({
    testId,
}: {
    testId: string;
}) {
    const form = useForm({
        resolver: zodResolver(InputSchema),
        defaultValues: {
            testId: testId,
            file: null,
        },
    });

    const [pending, startTransition] = useTransition();
    const onSubmit = form.handleSubmit((data) => {
        startTransition(async () => {
            const response = await setInputFileAction(data);
            if (response.success) {
                form.reset();
                alert("Input dosyası başarıyla yüklendi.");
            } else {
                form.setError("root", {
                    type: "manual",
                    message: response.error,
                });
            }
        })
    });

    return (
        <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Input Dosyası</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".json"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            field.onChange(e.target.files[0]);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Kabul edilen formatlar: .json
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <input type="hidden" name="testId" value={testId} />

                {form.formState.errors.root && (
                    <p className="text-red-500">
                        {form.formState.errors.root.message}
                    </p>
                )}

                <Button type="submit" className="w-full" disabled={pending}>
                    Seç
                </Button>
            </form>
        </Form>
    );
}