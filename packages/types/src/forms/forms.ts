export const INPUT_TYPES = [
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
] as const;

export type InputType = (typeof INPUT_TYPES)[number];

export type ValidationRuleValue = string | number | boolean | Date;

export interface ValidationRule {
  rules: Record<string, ValidationRuleValue>;
}

export interface QuestionInput {
  id: string;
  label: string;
  placeholder?: string;
  defaultValue?: string;
}

export interface Question {
  id: string;
  title: string;
  formId: string;
  inputType: InputType;
  questionInputs: QuestionInput[];
  validationRules: ValidationRule;
  createdAt: Date;
}

export interface Form {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  createdAt: Date;
}

export interface CreateFormDto {
  name: string;
  description?: string;
  questions: CreateQuestionDto[];
}

export interface CreateQuestionDto {
  title: string;
  input_type: InputType;
  question_inputs: CreateQuestionInputDto[];
  validation_rules: ValidationRule;
}

interface CreateQuestionInputDto {
  label: string;
  placeholder?: string;
  default_value?: string;
}

export type EditableQuestion = CreateQuestionDto & {
  id: string;
};
