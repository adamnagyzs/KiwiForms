import type {
  Answer,
  AnswerRow,
  FormSubmission,
  FormSubmissionWithRelations,
} from "@kiwiforms/types";

export function mapFormSubmission(
  submission: FormSubmissionWithRelations,
): FormSubmission {
  return {
    id: submission.id,
    formId: submission.form_id,
    createdAt: new Date(submission.created_at),
    answers: (submission.answers ?? []).map((answer) => mapAnswer(answer)),
  };
}

function mapAnswer(answer: AnswerRow): Answer {
  return {
    id: answer.id,
    questionId: answer.question_id,
    value: answer.value,
    createdAt: new Date(answer.created_at),
  };
}
