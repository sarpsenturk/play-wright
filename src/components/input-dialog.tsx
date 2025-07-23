import { FileInput } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { InputForm } from "./input-form";

export function InputDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <FileInput />
                    <span className="sr-only">Input Seç</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Input Seç</DialogTitle>
                    <DialogDescription>
                        Test için kullanılacak input seçin.
                    </DialogDescription>
                </DialogHeader>

                <InputForm />
            </DialogContent>
        </Dialog>
    )
}