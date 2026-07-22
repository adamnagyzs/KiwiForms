import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import QuestionEditor from "@/components/forms/QuestionEditor";
import { createFormSchema, type FormValues } from "@/types/create-form";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";

export default function CreateForm() {
  const { register, control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),

    defaultValues: {
      name: "",
      description: "",

      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,

    name: "questions",
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-4xl my-7">Create Form</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-5"
      >
        <Input
          {...register("name")}
          placeholder="Form name"
          className="w-full border rounded-md px-3 py-2"
          label=""
        />

        <Textarea
          {...register("description")}
          placeholder="Description"
          className="w-full border rounded-md px-3 py-2"
          label=""
        />

        {fields.map((field, index) => (
          <QuestionEditor
            key={field.id}
            index={index}
            control={control}
            register={register}
            removeQuestion={remove}
          />
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
          className="bg-teal-700 text-white px-4 py-2 rounded-md cursor-pointer"
        >
          + Add Question
        </button>

        <button
          type="submit"
          className="w-full bg-teal-900 text-white py-3 rounded-md cursor-pointer"
        >
          Save Form
        </button>
      </form>
    </div>
  );
}
