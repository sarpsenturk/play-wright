import { FileInput } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { InputForm } from "./input-form";

export function InputDialog({
    testId,
    input,
}: {
    testId: string;
    input: string | null;
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm">
                    {input || "Dosya Yükle"}
                    <FileInput />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Input Seç</DialogTitle>
                    <DialogDescription>
                        Test için kullanılacak input seçin.
                    </DialogDescription>
                </DialogHeader>

                <InputForm testId={testId} />
            </DialogContent>
        </Dialog>
    )
}