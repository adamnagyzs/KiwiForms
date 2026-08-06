import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, type FormValues } from "@/types/create-form";
import { createForm } from "@/services/forms.service";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import FormEditor from "@/components/forms/FormEditor";

export default function CreateForm() {
  const navigate = useNavigate();

  const methods = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      questions: [],
    },
  });

  const { mutateAsync: createFormMutation, isPending } = useMutation({
    mutationFn: createForm,
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createFormMutation(data);
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl my-7">Create Form</h1>
        <FormEditor onSubmit={onSubmit} isPending={isPending} />
      </div>
    </FormProvider>
  );
}
