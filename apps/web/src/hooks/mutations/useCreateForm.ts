import { createForm } from "@/services/forms.service";
import { QUERY_KEYS } from "@/utils/query-keys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateForm = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createForm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.forms.all });
    },
  });
};
