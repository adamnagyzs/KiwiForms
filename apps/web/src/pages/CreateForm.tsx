import type { SubmitHandler } from "react-hook-form";
import type { FormValues } from "@/types/create-form";
import FormEditor from "@/components/forms/FormEditor";
import { useCreateForm } from "@/hooks/mutations/useCreateForm";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const navigate = useNavigate();
  const { mutateAsync: createFormMutation, isPending } = useCreateForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await createFormMutation(data);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-4xl my-7">Create Form</h1>
      <FormEditor onSubmit={onSubmit} isPending={isPending} />
    </div>
  );
}
