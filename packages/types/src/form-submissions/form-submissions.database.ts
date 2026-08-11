import type { Database } from "../database/database.types";
import type { FormSubmissionRow } from "../forms/forms.database";

export type AnswerRow = Database["public"]["Tables"]["answers"]["Row"];

export type FormSubmissionWithRelations = FormSubmissionRow & {
  answers: AnswerRow[] | null;
};

export const FORM_SUBMISSION_SELECT = `
  *,
  answers (*)
`;
