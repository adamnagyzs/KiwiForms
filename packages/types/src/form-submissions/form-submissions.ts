export interface Answer {
  id: string;
  questionId: string;
  value: string;
  createdAt: Date;
}

export interface FormSubmission {
  id: string;
  formId: string;
  answers: Answer[];
  createdAt: Date;
}
