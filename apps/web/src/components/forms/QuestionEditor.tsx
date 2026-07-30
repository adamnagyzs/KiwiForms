import {
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";

import type { FormValues } from "@/types/create-form";
import Input from "../ui/Input";
import Select from "../ui/Select";
import { QUESTION_INPUT_TYPE_OPTIONS } from "@/utils/consts";

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
  const selectedType = useWatch({
    control,
    name: `questions.${index}.input_type`,
  });

  const chooseableType = ["checkbox", "radio", "select"].includes(selectedType);

  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${index}.question_inputs`,
  });

  return (
    <div className="rounded-md bg-teal-600 p-5 space-y-4">
      <div>
        <Input
          {...register(`questions.${index}.title`)}
          className="w-full rounded-md border px-3 py-2"
          placeholder="Question title"
          label="Question Title"
        />
      </div>

      <Select
        label="Answer type"
        {...register(`questions.${index}.input_type`)}
        className="w-full rounded-md border px-3 py-2"
        options={QUESTION_INPUT_TYPE_OPTIONS}
      />

      {chooseableType && (
        <div className="space-y-3">
          <label className="block mb-1 text-sm font-medium text-teal-50">
            Options
          </label>

          {fields.map((field, optionIndex) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(
                  `questions.${index}.question_inputs.${optionIndex}.label`,
                )}
                className="flex-1 rounded-md border px-3 py-2"
                placeholder={`Option ${optionIndex + 1}`}
                label=""
              />

              <button
                type="button"
                onClick={() => remove(optionIndex)}
                className="bg-red-500 text-white px-4 rounded-md cursor-pointer hover:bg-red-600 h-11 mt-1"
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
            className="bg-teal-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-800"
          >
            + Add option
          </button>
        </div>
      )}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => removeQuestion(index)}
          className="bg-red-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-800"
        >
          Remove question
        </button>
      </div>
    </div>
  );
}
