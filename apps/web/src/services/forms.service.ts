import { axiosClient } from "@/libs/axios";
import type { CreateFormDto, Form, UpdateFormDto } from "@kiwiforms/types";

export const createForm = async (dto: CreateFormDto): Promise<Form> => {
  const response = await axiosClient.post<Form>("/forms", dto);

  return response.data;
};

export async function getForms(): Promise<Form[]> {
  const response = await axiosClient.get<Form[]>("/forms");

  return response.data;
}

export const getForm = async (formId: string): Promise<Form> => {
  const response = await axiosClient.get<Form>(`/forms/${formId}`);
  return response.data;
};

export const updateForm = async ({
  formId,
  data,
}: {
  formId: string;
  data: UpdateFormDto;
}): Promise<Form> => {
  const response = await axiosClient.patch<Form>(`/forms/${formId}`, data);

  return response.data;
};

export const deleteForm = async (formId: string): Promise<void> => {
  await axiosClient.delete(`/forms/${formId}`);
};
