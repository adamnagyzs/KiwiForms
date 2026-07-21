import { useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import TextInput from "@/components/TextInput";
import ErrorMessage from "@/components/ErrorMessage";

import type { EditableQuestion } from "../../../../packages/types/src/forms/forms";

const questionSchema = z.object({
  title: z.string().min(3, "Question must be at least 3 characters"),

  input_type: z.enum([
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
  ]),

  question_inputs: z.array(
    z.object({
      label: z.string().min(1, "Option cannot be empty"),
    }),
  ),
});

type QuestionForm = z.infer<typeof questionSchema>;

export function CreateForm() {
  const [questions, setQuestions] = useState<EditableQuestion[]>([]);

  const {
    register,
    control,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuestionForm>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      input_type: "text",
      question_inputs: [],
    },
  });

  const selectedType = watch("input_type");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "question_inputs",
  });

  const onSubmit: SubmitHandler<QuestionForm> = async (data) => {
    const newQuestion: EditableQuestion = {
      id: crypto.randomUUID(),
      title: data.title,
      input_type: data.input_type,
      question_inputs: data.question_inputs,
      validation_rules: {
        rules: {},
      },
    };

    setQuestions((prev) => [...prev, newQuestion]);

    reset({
      title: "",
      input_type: "text",
      question_inputs: [],
    });
  };

  return (
    <>
      <h1 className="flex justify-center my-7 text-4xl">Create a Form!</h1>

      <div className="flex flex-col items-center gap-5">
        <form
          className="flex flex-col gap-4 w-full max-w-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            label="Question Title"
            error={errors.title?.message}
            {...register("title")}
            type="text"
            placeholder="Question title"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="input_type">Answer Type</label>

            <select
              {...register("input_type")}
              className="rounded-md border px-4 py-2"
            >
              <option value="text">Text</option>
              <option value="number">Number</option>
              <option value="textarea">Text Area</option>
              <option value="checkbox">Checkbox</option>
              <option value="radio">Radio</option>
              <option value="select">Select</option>
              <option value="date">Date</option>
              <option value="date-range">Date Range</option>
              <option value="time">Time</option>
              <option value="time-range">Time Range</option>
            </select>

            {["checkbox", "radio", "select"].includes(selectedType) && (
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <label className="font-medium mt-3">Options</label>

                  {fields.map((field, index) => (
                    <div key={field.id} className="flex gap-2">
                      <input
                        {...register(`question_inputs.${index}.label`)}
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 rounded-md border px-3 py-2"
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="rounded-md bg-red-500 px-3 text-white cursor-pointer"
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
                    className="self-start rounded-md bg-teal-700 px-4 py-2 text-white cursor-pointer"
                  >
                    + Add option
                  </button>
                </div>
              </div>
            )}

            <ErrorMessage message={errors.input_type?.message} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-teal-800 px-4 py-3 font-bold text-white transition-colors hover:bg-teal-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save Question"}
          </button>
        </form>

        <div className="mt-5 flex w-full max-w-md flex-col gap-3">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className="rounded-md bg-teal-700 p-4 text-white"
            >
              <p className="font-semibold">
                {index + 1}. {question.title}
              </p>

              <p className="text-sm opacity-80">Type: {question.input_type}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
