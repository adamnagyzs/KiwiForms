import { useQuery } from "@tanstack/react-query";
import { getForms } from "@/services/forms.service";
import { QUERY_KEYS } from "@/utils/query-keys";

export const useGetForms = () => {
  return useQuery({
    queryKey: QUERY_KEYS.forms.all,
    queryFn: getForms,
  });
};
