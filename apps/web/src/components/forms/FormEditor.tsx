import {
  useForm,
  FormProvider,
  useFieldArray,
  type SubmitHandler,
  type FieldError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, type FormValues } from "@/types/create-form";

import QuestionEditor from "./QuestionEditor";
import Input from "../ui/Input";
import Textarea from "../ui/TextArea";
import ErrorMessage from "../ui/ErrorMessage";

type FormEditorProps = {
  initialValues?: FormValues;
  onSubmit: SubmitHandler<FormValues>;
  isPending: boolean;
};

export default function FormEditor({
  initialValues,
  onSubmit,
  isPending,
}: FormEditorProps) {
  const methods = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      questions: [],
    },
    values: initialValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const handleAddQuestion = () => {
    append({
      title: "",
      input_type: "text",
      question_inputs: [],
      validation_rules: {
        rules: {},
      },
    });
  };

  return (
    <FormProvider {...methods}>
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
          <QuestionEditor
            key={field.id}
            index={index}
            removeQuestion={remove}
          />
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-teal-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-800"
        >
          + Add Question
        </button>

        <ErrorMessage
          message={
            errors.questions?.root?.message ??
            (errors.questions as FieldError | undefined)?.message
          }
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-teal-800 text-white py-3 rounded-md cursor-pointer hover:bg-teal-900"
        >
          {isPending ? "Saving form..." : "Save form"}
        </button>
      </form>
    </FormProvider>
  );
}
