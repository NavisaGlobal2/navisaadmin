
import * as z from "zod";

export const formSettingsSchema = z.object({
  allowGuestSubmissions: z.boolean(),
  enableProgressSaving: z.boolean(),
  maxFileSize: z.number().min(1).max(10),
  requiredFields: z.object({
    linkedin: z.boolean(),
    skills: z.boolean(),
    achievements: z.boolean(),
  }),
  sections: z.array(z.object({
    title: z.string(),
    required: z.boolean(),
    description: z.string(),
    enabled: z.boolean()
  }))
});

export type FormSettingsValues = z.infer<typeof formSettingsSchema>;
