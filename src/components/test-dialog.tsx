import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { CreateTestForm } from "./test-form";

export function CreateTestDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Plus /> <span className="sr-only">Yeni test ekle</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni Test Ekle</DialogTitle>
                    <DialogDescription>
                        Yeni test dosyası eklemek için formu doldurun.
                    </DialogDescription>
                </DialogHeader>

                <CreateTestForm />
            </DialogContent>
        </Dialog>
    )
}