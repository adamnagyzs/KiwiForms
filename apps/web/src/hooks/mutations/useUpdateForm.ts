import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateForm } from "@/services/forms.service";
import { QUERY_KEYS } from "@/utils/query-keys";

export const useUpdateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateForm,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.forms.all });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.forms.detail(variables.formId),
      });
    },
  });
};
