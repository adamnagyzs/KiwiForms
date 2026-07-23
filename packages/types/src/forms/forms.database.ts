import type { Database } from "../database/database.types";

export type FormRow = Database["public"]["Tables"]["forms"]["Row"];
export type QuestionRow = Database["public"]["Tables"]["questions"]["Row"];
export type QuestionInputRow =
  Database["public"]["Tables"]["question_inputs"]["Row"];
export type ValidationRuleRow =
  Database["public"]["Tables"]["validation_rules"]["Row"];
export type FormSubmissionRow =
  Database["public"]["Tables"]["form_submissions"]["Row"];

export type QuestionIdRow = Pick<QuestionRow, "id">;
export type FormSubmissionIdRow = Pick<FormSubmissionRow, "id">;

export type QuestionWithRelations = QuestionRow & {
  question_inputs: QuestionInputRow[];
  validation_rules: ValidationRuleRow | ValidationRuleRow[] | null;
};

export type FormWithRelations = FormRow & {
  questions: QuestionWithRelations[] | null;
};

export const FORM_SELECT = `
  *,
  questions (
    *,
    question_inputs (*),
    validation_rules (*)
  )
`;
