import { useQuery } from "@tanstack/react-query";
import { getForm } from "@/services/forms.service";
import { QUERY_KEYS } from "@/utils/query-keys";

export const useGetForm = (id: string | undefined) => {
  return useQuery({
    queryKey: QUERY_KEYS.forms.detail(id as string),
    queryFn: () => getForm(id!),
    enabled: !!id,
  });
};
