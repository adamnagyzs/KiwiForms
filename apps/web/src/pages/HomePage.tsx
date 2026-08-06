import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getForms, deleteForm } from "@/services/forms.service";
import { Link } from "react-router-dom";
import ConfirmModal from "@/components/ui/ConfirmModal";

export default function HomePage() {
  const queryClient = useQueryClient();

  const [formToDelete, setFormToDelete] = useState<string | null>(null);

  const {
    data: forms,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["forms"],
    queryFn: getForms,
  });

  const { mutateAsync: deleteFormMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteForm,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forms"] });
        setFormToDelete(null);
      },
    });

  const handleConfirmDelete = async () => {
    if (formToDelete) {
      await deleteFormMutation(formToDelete);
    }
  };
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }
  if (isError) {
    return <p className="text-center mt-10 text-red-500">{String(error)}</p>;
  }

  return (
    <>
      <h1 className="flex justify-center text-4xl font-bold mt-10">
        Recent forms
      </h1>

      <div className="flex flex-col items-center space-y-6 mt-10">
        {forms?.map((form) => (
          <div key={form.id} className="w-150">
            <Link to={`/forms/${form.id}`}>
              <div className="rounded-md border p-4 shadow transition hover:shadow-md bg-white">
                <h2 className="text-xl font-bold">{form.name}</h2>
                <p className="text-gray-600 mt-1">{form.description}</p>
                <p className="text-sm text-gray-400 mt-3">
                  {form.questions.length} questions
                </p>
              </div>
            </Link>
            <div className="flex justify-end gap-4 mt-2 px-2">
              <Link
                to={`/forms/${form.id}/edit`}
                className="text-teal-700 font-medium hover:text-teal-800 transition"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => setFormToDelete(form.id)}
                className="text-red-600 font-medium hover:text-red-800 transition cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {forms?.length === 0 && (
          <p className="text-gray-500">You haven't created any forms yet.</p>
        )}
      </div>
      <ConfirmModal
        isOpen={formToDelete !== null}
        title="Delete Form"
        message="Are you sure you want to delete this form? All questions and submitted answers will be permanently lost."
        confirmText="Yes, delete it"
        cancelText="Cancel"
        variant="danger"
        isPending={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setFormToDelete(null)}
      />
    </>
  );
}
