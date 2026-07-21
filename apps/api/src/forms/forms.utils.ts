import type {
  Form,
  FormWithRelations,
  InputType,
  Question,
  QuestionWithRelations,
  ValidationRuleValue,
} from "@kiwiforms/types";

export function mapForm(form: FormWithRelations): Form {
  return {
    id: form.id,
    name: form.title,
    description: form.description ?? undefined,
    createdAt: new Date(form.created_at),
    questions: (form.questions ?? []).map((question) => mapQuestion(question)),
  };
}

export function mapQuestion(question: QuestionWithRelations): Question {
  const validationRule = Array.isArray(question.validation_rules)
    ? question.validation_rules[0]
    : question.validation_rules;

  return {
    id: question.id,
    title: question.title,
    formId: question.form_id,
    inputType: question.input_type as InputType,
    createdAt: new Date(question.created_at),
    questionInputs: (question.question_inputs ?? []).map((input) => ({
      id: input.id,
      label: input.label,
      placeholder: input.placeholder || undefined,
      defaultValue: input.default_value || undefined,
    })),
    validationRules: {
      rules: (validationRule?.rules ?? {}) as Record<
        string,
        ValidationRuleValue
      >,
    },
  };
}
