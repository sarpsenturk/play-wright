import { z } from "zod"

export const CreateProjectSchema = z.object({
    name: z.string().min(1, "Proje adı zorunludur"),
    url: z.url("Geçerli bir URL girin").min(1, "Proje URL'si zorunludur"),
    description: z.string().optional(),
});