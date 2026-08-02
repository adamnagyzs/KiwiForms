import { z } from "zod";

export const createFormSchema = z.object({
  name: z.string().min(3, "Form title must contain at least 3 characters"),

  description: z.string().optional(),

  questions: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, "Question title must contain at least 3 characters"),

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
            label: z.string().min(1, "Option cannot be empty"),
          }),
        ),

        validation_rules: z.object({
          rules: z.record(z.string(), z.any()),
        }),
      }),
    )
    .min(1, "Add at least one question"),
});

export type FormValues = z.infer<typeof createFormSchema>;
