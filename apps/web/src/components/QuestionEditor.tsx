import {
  useFieldArray,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import type { FormValues } from "@/types/create-form";

type QuestionEditorProps = {
  index: number;
  control: Control<FormValues>;
  register: UseFormRegister<FormValues>;
  removeQuestion: (index: number) => void;
};

export default function QuestionEditor({
  index,
  control,
  register,
  removeQuestion,
}: QuestionEditorProps) {
  const selectedTypeName = `questions.${index}.input_type` as const;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.question_inputs`,
  });

  return (
    <div className="rounded-md bg-slate-200 p-5 space-y-4">
      <div>
        <label className="font-medium">Question title</label>

        <input
          {...register(`questions.${index}.title`)}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Question title"
        />
      </div>

      <div>
        <label className="font-medium">Answer type</label>

        <select
          {...register(selectedTypeName)}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="text">Text</option>

          <option value="number">Number</option>

          <option value="textarea">Text area</option>

          <option value="checkbox">Checkbox</option>

          <option value="radio">Radio</option>

          <option value="select">Select</option>

          <option value="date">Date</option>

          <option value="date-range">Date range</option>

          <option value="time">Time</option>

          <option value="time-range">Time range</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="font-medium">Options</label>

        {fields.map((field, optionIndex) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(
                `questions.${index}.question_inputs.${optionIndex}.label`,
              )}
              className="flex-1 rounded-md border px-3 py-2"
              placeholder={`Option ${optionIndex + 1}`}
            />

            <button
              type="button"
              onClick={() => remove(optionIndex)}
              className="bg-red-500 text-white px-3 rounded-md cursor-pointer"
            >
              X
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({
              label: "",
            })
          }
          className="bg-teal-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          + Add option
        </button>
      </div>

      <button
        type="button"
        onClick={() => removeQuestion(index)}
        className="bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer"
      >
        Remove question
      </button>
    </div>
  );
}
