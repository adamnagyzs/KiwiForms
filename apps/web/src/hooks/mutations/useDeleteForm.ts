import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteForm } from "@/services/forms.service";
import { QUERY_KEYS } from "@/utils/query-keys";

export const useDeleteForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.forms.all });
    },
  });
};
