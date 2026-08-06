import {
  useFieldArray,
  useFormContext,
  type SubmitHandler,
} from "react-hook-form";

import { FormValues } from "@/types/create-form";
import QuestionEditor from "./QuestionEditor";
import Input from "../ui/Input";
import Textarea from "../ui/TextArea";
import ErrorMessage from "../ui/ErrorMessage";

type FormEditorProps = {
  onSubmit: SubmitHandler<FormValues>;
  isPending: boolean;
};

export default function FormEditor({ onSubmit, isPending }: FormEditorProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormValues>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-xl space-y-5"
    >
      <Input
        {...register("name")}
        placeholder="Pineapple on Pizza?"
        className="w-full border rounded-md px-3 py-2"
        label="Form title"
        error={errors.name?.message}
      />

      <Textarea
        {...register("description")}
        placeholder="One simple question. One controversial answer. Vote and see the results."
        className="w-full border rounded-md px-3 py-2"
        label="Form description"
      />

      {fields.map((field, index) => (
        <QuestionEditor key={field.id} index={index} removeQuestion={remove} />
      ))}

      <button
        type="button"
        onClick={() =>
          append({
            title: "",
            input_type: "text",
            question_inputs: [],
            validation_rules: {
              rules: {},
            },
          })
        }
        className="bg-teal-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-800"
      >
        + Add Question
      </button>

      <ErrorMessage
        message={errors.questions?.root?.message ?? errors.questions?.message}
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-teal-800 text-white py-3 rounded-md cursor-pointer hover:bg-teal-900"
      >
        {isPending ? "Saving form..." : "Save form"}
      </button>
    </form>
  );
}
