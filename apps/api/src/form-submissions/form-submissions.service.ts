import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateFormSubmissionDto,
  Database,
  FormIdRow,
  FormSubmission,
  FormSubmissionWithRelations,
  UpdateFormSubmissionDto,
} from "@kiwiforms/types";
import { FORM_SUBMISSION_SELECT } from "@kiwiforms/types";
import { SUPABASE_ADMIN_CLIENT } from "../supabase/supabase.constants";
import { mapFormSubmission } from "./form-submissions.utils";

@Injectable()
export class FormSubmissionsService {
  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabaseAdmin: SupabaseClient<Database>,
  ) {}

  async getFormSubmissions(userId: string): Promise<FormSubmission[]> {
    const { data: forms, error: formsError } = await this.supabaseAdmin
      .from("forms")
      .select("id")
      .eq("user_id", userId);

    if (formsError) {
      throw new BadRequestException(
        `Failed to get form submissions: ${formsError.message}`,
      );
    }

    const formIds = (forms ?? []).map((form) => form.id);

    if (formIds.length === 0) {
      return [];
    }

    const { data, error } = await this.supabaseAdmin
      .from("form_submissions")
      .select(FORM_SUBMISSION_SELECT)
      .in("form_id", formIds)
      .order("created_at", { ascending: false });

    if (error || !data) {
      throw new BadRequestException(
        `Failed to get form submissions: ${error?.message ?? "Unknown error"}`,
      );
    }

    return data.map((submission) => mapFormSubmission(submission));
  }

  async getFormSubmissionById(
    userId: string,
    submissionId: string,
  ): Promise<FormSubmission> {
    const submission = await this.getSubmissionWithRelations(submissionId);
    await this.verifyFormOwnership(submission.form_id, userId);

    return mapFormSubmission(submission);
  }

  async createFormSubmission(
    dto: CreateFormSubmissionDto,
  ): Promise<FormSubmission> {
    if (dto.answers.length === 0) {
      throw new BadRequestException("At least one answer is required");
    }

    const { data: submissionId, error } = await this.supabaseAdmin.rpc(
      "create_form_submission",
      {
        p_form_id: dto.form_id,
        p_answers: dto.answers.map((answer) => ({
          question_id: answer.question_id,
          value: answer.value,
        })),
      },
    );

    if (error) {
      throw new BadRequestException(
        `Unable to create form submission: ${error.message}`,
      );
    }

    return this.getSubmissionById(submissionId);
  }

  async updateFormSubmission(
    userId: string,
    submissionId: string,
    _dto: UpdateFormSubmissionDto,
  ): Promise<FormSubmission> {
    return this.getFormSubmissionById(userId, submissionId);
  }

  async deleteFormSubmission(
    userId: string,
    submissionId: string,
  ): Promise<void> {
    await this.getFormSubmissionById(userId, submissionId);
  }

  private async getSubmissionById(
    submissionId: string,
  ): Promise<FormSubmission> {
    const submission = await this.getSubmissionWithRelations(submissionId);
    return mapFormSubmission(submission);
  }

  private async getSubmissionWithRelations(
    submissionId: string,
  ): Promise<FormSubmissionWithRelations> {
    const { data, error } = await this.supabaseAdmin
      .from("form_submissions")
      .select(FORM_SUBMISSION_SELECT)
      .eq("id", submissionId)
      .single<FormSubmissionWithRelations>();

    if (error || !data) {
      throw new NotFoundException("Form submission not found");
    }

    return data;
  }

  private async verifyFormOwnership(
    formId: string,
    userId: string,
  ): Promise<void> {
    const { data, error } = await this.supabaseAdmin
      .from("forms")
      .select("id")
      .eq("id", formId)
      .eq("user_id", userId)
      .single<FormIdRow>();

    if (error || !data) {
      throw new NotFoundException("Form submission not found");
    }
  }
}
