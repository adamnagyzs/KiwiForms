import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm, FormProvider, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { getForm, updateForm } from "@/services/forms.service";
import { createFormSchema, type FormValues } from "@/types/create-form";
import { LoadingScreen } from "@/components/ui/loading-screen";
import FormEditor from "@/components/forms/FormEditor";

export default function EditFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: form,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["forms", id],
    queryFn: () => getForm(id!),
    enabled: !!id,
  });

  const { mutateAsync: updateFormMutation, isPending } = useMutation({
    mutationFn: updateForm,
    onSuccess: () => navigate("/"),
  });

  const methods = useForm<FormValues>({
    resolver: zodResolver(createFormSchema),
    mode: "onSubmit",
    values: form
      ? {
          name: (form as any).title || (form as any).name,
          description: form.description ?? "",
          questions: form.questions as any,
        }
      : undefined,
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateFormMutation({ formId: id!, data });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !form) {
    return <div>Form not found.</div>;
  }

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl my-7">Edit Form</h1>
        <FormEditor onSubmit={onSubmit} isPending={isPending} />
      </div>
    </FormProvider>
  );
}
