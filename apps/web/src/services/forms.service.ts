import { axiosClient } from "@/libs/axios";
import type { CreateFormDto, Form } from "@kiwiforms/types";

export const createForm = async (dto: CreateFormDto): Promise<Form> => {
  const response = await axiosClient.post<Form>("/forms", dto);

  return response.data;
};

export async function getForms(): Promise<Form[]> {
  const response = await axiosClient.get<Form[]>("/forms");

  return response.data;
}
