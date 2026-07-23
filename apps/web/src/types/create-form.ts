import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().min(3),

  description: z.string().optional(),

  questions: z.array(
    z.object({
      title: z.string().min(3),

      input_type: z.enum([
        "text",
        "number",
        "checkbox",
        "radio",
        "textarea",
        "select",
        "date",
        "date-range",
        "time",
        "time-range",
      ]),

      question_inputs: z.array(
        z.object({
          label: z.string(),
        }),
      ),

      validation_rules: z.object({
        rules: z.record(z.string(), z.any()),
      }),
    }),
  ),
});

export type FormValues = z.infer<typeof createFormSchema>;
