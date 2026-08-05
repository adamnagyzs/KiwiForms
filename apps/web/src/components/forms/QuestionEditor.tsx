import {
  useFieldArray,
  useWatch,
  useFormContext,
  UseFieldArrayRemove,
} from "react-hook-form";

import Input from "../ui/Input";
import Select from "../ui/Select";
import { QUESTION_INPUT_TYPE_OPTIONS } from "@/utils/consts";
import ErrorMessage from "../ui/ErrorMessage";
import { FormValues } from "@/types/create-form";

type QuestionEditorProps = {
  index: number;
  removeQuestion: UseFieldArrayRemove;
};

export default function QuestionEditor({
  index,
  removeQuestion,
}: QuestionEditorProps) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

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
          error={errors.questions?.[index]?.title?.message}
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
          {fields.map((field, optionIndex) => (
            <div key={field.id} className="flex gap-2 w-full items-end">
              <Input
                {...register(
                  `questions.${index}.question_inputs.${optionIndex}.label`,
                )}
                className="flex-1 rounded-md border px-3 py-2"
                placeholder={`Option ${optionIndex + 1}`}
                label={`Option ${optionIndex + 1}`}
                wrapperClassName="flex-1"
              />

              <button
                type="button"
                onClick={() => remove(optionIndex)}
                className="bg-red-500 text-white px-4 rounded-md cursor-pointer hover:bg-red-600 h-11"
              >
                X
              </button>

              <ErrorMessage
                message={
                  errors.questions?.[index]?.question_inputs?.[optionIndex]
                    ?.label?.message
                }
              />
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
