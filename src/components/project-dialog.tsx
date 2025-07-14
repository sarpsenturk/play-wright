import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { ProjectForm } from "./project-form";

export function ProjectDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Plus />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Yeni Proje Ekle</DialogTitle>
                    <DialogDescription>
                        Test etmek istediğiniz projenin adını ve URL'sini girin.
                    </DialogDescription>
                </DialogHeader>

                <ProjectForm />
            </DialogContent>
        </Dialog>
    )
}