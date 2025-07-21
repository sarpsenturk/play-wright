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
    viewport: z.string().optional().refine(
        (val) => {
            if (!val) return true; // Optional field, so empty is valid
            return /^\d+,\d+$/.test(val);
        },
        {
            message: "Viewport boyutu '800,600' formatında olmalıdır"
        }
    ),
    input: z.string().optional().refine(
        (val) => {
            if (!val) return true; // Optional field, so empty is valid
            return val.endsWith(".json");
        },
        {
            message: "Girdi dosyası .json uzantılı olmalıdır"
        }
    )
});