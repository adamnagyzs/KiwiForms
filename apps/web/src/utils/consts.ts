export const QUESTION_INPUT_TYPE_OPTIONS = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "textarea", label: "Text area" },
  { value: "checkbox", label: "Checkbox" },
  { value: "radio", label: "Radio" },
  { value: "select", label: "Select" },
  { value: "date", label: "Date" },
  { value: "date-range", label: "Date range" },
  { value: "time", label: "Time" },
  { value: "time-range", label: "Time range" },
] as const;

export const input_type = [
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
