import { z } from "zod";

export const projectFormSchema = z.object({
  projectName: z.string().min(1, { message: "Project name is required" }),
  demoUrl: z.string().min(1, { message: "Demo URL is required" }),
  repositoryUrl: z.string().min(1, { message: "Repository URL is required" }),
  description: z.string().min(1, { message: "Description is required" }),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
