export type InputType =
  | "text"
  | "number"
  | "checkbox"
  | "radio"
  | "textarea"
  | "select"
  | "date"
  | "date-range"
  | "time"
  | "time-range";

interface Form {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  created_at: Date;
}

interface Question {
  id: string;
  title: string;
  form_id: string;
  input_type: InputType;
  question_inputs: QuestionInput[];
  validation_rules: ValidationRule;
  created_at: Date;
}

interface QuestionInput {
  id: string;
  label: string;
  placeholder?: string;
  default_value?: string;
}

interface ValidationRule {
  rules: Record<string, ValidationRuleValue>;
}

type ValidationRuleValue = string | number | boolean | Date;

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
