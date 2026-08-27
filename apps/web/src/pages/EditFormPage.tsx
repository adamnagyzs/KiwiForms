import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { SubmitHandler } from "react-hook-form";
import type { FormValues } from "@/types/create-form";
import { LoadingScreen } from "@/components/ui/loading-screen";
import FormEditor from "@/components/forms/FormEditor";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { useGetForm } from "@/hooks/queries/useGetForm";
import { useUpdateForm } from "@/hooks/mutations/useUpdateForm";
import { useDeleteForm } from "@/hooks/mutations/useDeleteForm";

export default function EditFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data: form, isLoading, isError, isSuccess } = useGetForm(id);

  const { mutateAsync: updateFormMutation, isPending: isUpdating } =
    useUpdateForm();

  const { mutateAsync: deleteFormMutation, isPending: isDeleting } =
    useDeleteForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await updateFormMutation({ formId: id!, data });
    navigate("/");
  };

  const handleConfirmDelete = async () => {
    await deleteFormMutation(id!);
    setIsDeleteModalOpen(false);
    navigate("/");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError || !isSuccess) {
    return <div>Form not found.</div>;
  }

  const mappedInitialValues: FormValues = {
    name: form.name,
    description: form.description ?? "",
    questions: form.questions.map((q) => ({
      title: q.title,
      input_type: q.inputType,
      question_inputs: q.questionInputs.map((qi) => ({
        label: qi.label,
      })),
      validation_rules: q.validationRules ?? { rules: {} },
    })),
  };

  return (
    <>
      <div className="flex flex-col items-center gap-5 w-full">
        <div className="flex justify-between items-center w-full max-w-xl my-7">
          <h1 className="text-4xl font-bold">Edit Form</h1>
          <button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
          >
            Delete Form
          </button>
        </div>

        <FormEditor
          initialValues={mappedInitialValues}
          onSubmit={onSubmit}
          isPending={isUpdating}
        />
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Form"
        message="Are you sure you want to delete this form? All questions and submitted answers will be permanently lost."
        confirmText="Yes, delete it"
        cancelText="Keep it"
        variant="danger"
        isPending={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
