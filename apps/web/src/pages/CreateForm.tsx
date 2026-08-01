import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import QuestionEditor from "@/components/forms/QuestionEditor";
import { createFormSchema, type FormValues } from "@/types/create-form";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/TextArea";
import { createForm } from "@/services/forms.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function CreateForm() {
  const navigate = useNavigate();

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

  const { mutateAsync: createFormMutation, isPending } = useMutation({
    mutationFn: createForm,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createFormMutation(data);
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
          placeholder="Pineapple on Pizza?"
          className="w-full border rounded-md px-3 py-2"
          label="Form title"
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
          className="bg-teal-700 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-teal-800"
        >
          + Add Question
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-teal-800 text-white py-3 rounded-md cursor-pointer hover:bg-teal-900"
        >
          {isPending ? "Saving form..." : "Save form"}
        </button>
      </form>
    </div>
  );
}
