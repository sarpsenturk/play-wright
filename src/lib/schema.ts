import { z } from "zod"

export const CreateProjectSchema = z.object({
    name: z.string().min(1, "Proje adı zorunludur"),
    url: z.url("Geçerli bir URL girin").min(1, "Proje URL'si zorunludur"),
    description: z.string().optional(),
    workflowName: z.string().min(1, "Workflow adı zorunludur"),
    workflowFilename: z.string().min(1, "Workflow dosya adı zorunludur"),
    workflowCron: z.string().min(1, "Workflow periyodu zorunludur"),
});

export const CreateTestSchema = z.object({
    name: z.string().min(1, "Test adı zorunludur"),
    filename: z.string().min(1, "Dosya adı zorunludur"),
    projectId: z.string().min(1, "Geçerli bir proje ID'si girin"),
});