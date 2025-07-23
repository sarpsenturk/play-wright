'use client'

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function InputForm() {
    const form = useForm({
        defaultValues: {
            input: null,
        },
    });

    return (
        <Form {...form}>
            <form className="space-y-4">
                <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Input Dosyası</FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept=".csv,.json,.txt"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files.length > 0) {
                                            field.onChange(e.target.files[0]);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                .csv, .json veya .txt
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    Seç
                </Button>
            </form>
        </Form>
    );
}