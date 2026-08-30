import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";
import type {
  CreateFormDto,
  CreateQuestionDto,
  Database,
  Form,
  FormRow,
  FormWithRelations,
  Json,
  QuestionRow,
  UpdateFormDto,
  UpdateQuestionDto,
  ValidationRuleValue,
} from "@kiwiforms/types";
import { FORM_SELECT } from "@kiwiforms/types";
import { SUPABASE_ADMIN_CLIENT } from "../supabase/supabase.constants";
import { mapForm } from "./forms.utils";

@Injectable()
export class FormsService {
  constructor(
    @Inject(SUPABASE_ADMIN_CLIENT)
    private readonly supabaseAdmin: SupabaseClient<Database>,
  ) {}

  async getForms(userId: string): Promise<Form[]> {
    const { data, error } = await this.supabaseAdmin
      .from("forms")
      .select(FORM_SELECT)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data) {
      throw new BadRequestException(`Failed to get forms: ${error.message}`);
    }

    return data.map((form) => mapForm(form));
  }

  async createForm(userId: string, dto: CreateFormDto): Promise<Form> {
    const { data: form, error: formError } = await this.supabaseAdmin
      .from("forms")
      .insert({
        title: dto.name,
        description: dto.description ?? null,
        user_id: userId,
      })
      .select()
      .single<FormRow>();

    if (formError || !form) {
      throw new BadRequestException(
        formError?.message ?? "Unable to create form",
      );
    }

    try {
      for (const question of dto.questions) {
        await this.createQuestion(form.id, question);
      }
    } catch (error) {
      await this.deleteFormData(form.id);
      throw error;
    }

    return this.getFormById(form.id, userId);
  }

  async updateForm(
    userId: string,
    formId: string,
    dto: UpdateFormDto,
  ): Promise<Form> {
    await this.getFormForUser(formId, userId);

    if (dto.name !== undefined || dto.description !== undefined) {
      const { error } = await this.supabaseAdmin
        .from("forms")
        .update({
          ...(dto.name !== undefined ? { title: dto.name } : {}),
          ...(dto.description !== undefined
            ? { description: dto.description ?? null }
            : {}),
        })
        .eq("id", formId)
        .eq("user_id", userId);

      if (error) {
        throw new BadRequestException(
          `Failed to update form: ${error.message}`,
        );
      }
    }

    if (dto.questions !== undefined) {
      await this.syncQuestions(formId, dto.questions);
    }

    return this.getFormById(formId, userId);
  }

  async deleteForm(userId: string, formId: string): Promise<void> {
    await this.getFormForUser(formId, userId);
    await this.deleteFormData(formId);

    const { error } = await this.supabaseAdmin
      .from("forms")
      .delete()
      .eq("id", formId)
      .eq("user_id", userId);

    if (error) {
      throw new BadRequestException(`Failed to delete form: ${error.message}`);
    }
  }

  private async getFormById(formId: string, userId: string): Promise<Form> {
    const { data, error } = await this.supabaseAdmin
      .from("forms")
      .select(FORM_SELECT)
      .eq("id", formId)
      .eq("user_id", userId)
      .single<FormWithRelations>();

    if (error || !data) {
      throw new NotFoundException("Form not found");
    }

    return mapForm(data);
  }

  private async getFormForUser(
    formId: string,
    userId: string,
  ): Promise<FormRow> {
    const { data, error } = await this.supabaseAdmin
      .from("forms")
      .select("*")
      .eq("id", formId)
      .eq("user_id", userId)
      .single<FormRow>();

    if (error || !data) {
      throw new NotFoundException("Form not found");
    }

    return data;
  }

  async getUserFormById(formId: string): Promise<Form> {
    const { data, error } = await this.supabaseAdmin
      .from("forms")
      .select(FORM_SELECT)
      .eq("id", formId)
      .single<FormWithRelations>();

    if (error || !data) {
      throw new NotFoundException("Form not found");
    }

    return mapForm(data);
  }

  private async createQuestion(
    formId: string,
    dto: CreateQuestionDto,
  ): Promise<void> {
    const { data: question, error: questionError } = await this.supabaseAdmin
      .from("questions")
      .insert({
        form_id: formId,
        title: dto.title,
        input_type: dto.input_type,
      })
      .select()
      .single<QuestionRow>();

    if (questionError || !question) {
      throw new BadRequestException(
        questionError?.message ?? "Unable to create question",
      );
    }

    await this.replaceQuestionInputs(question.id, dto.question_inputs);
    await this.replaceValidationRules(question.id, dto.validation_rules.rules);
  }

  private async updateQuestion(
    questionId: string,
    dto: UpdateQuestionDto,
  ): Promise<void> {
    const { error: questionError } = await this.supabaseAdmin
      .from("questions")
      .update({
        title: dto.title,
        input_type: dto.input_type,
      })
      .eq("id", questionId);

    if (questionError) {
      throw new BadRequestException(
        `Failed to update question: ${questionError.message}`,
      );
    }

    await this.replaceQuestionInputs(questionId, dto.question_inputs);
    await this.replaceValidationRules(questionId, dto.validation_rules.rules);
  }

  private async syncQuestions(
    formId: string,
    questions: UpdateQuestionDto[],
  ): Promise<void> {
    const { data: existingQuestions, error } = await this.supabaseAdmin
      .from("questions")
      .select("id")
      .eq("form_id", formId);

    if (error) {
      throw new BadRequestException(
        `Failed to sync questions: ${error.message}`,
      );
    }

    const payloadQuestionIds = new Set(
      questions.flatMap((question) => (question.id ? [question.id] : [])),
    );

    for (const existingQuestion of existingQuestions ?? []) {
      if (!payloadQuestionIds.has(existingQuestion.id)) {
        await this.deleteQuestion(existingQuestion.id);
      }
    }

    for (const question of questions) {
      if (question.id) {
        const belongsToForm = (existingQuestions ?? []).some(
          (existingQuestion) => existingQuestion.id === question.id,
        );

        if (!belongsToForm) {
          throw new BadRequestException(
            `Question ${question.id} does not belong to this form`,
          );
        }

        await this.updateQuestion(question.id, question);
        continue;
      }

      await this.createQuestion(formId, question);
    }
  }

  private async replaceQuestionInputs(
    questionId: string,
    inputs: CreateQuestionDto["question_inputs"],
  ): Promise<void> {
    const { error: deleteError } = await this.supabaseAdmin
      .from("question_inputs")
      .delete()
      .eq("question_id", questionId);

    if (deleteError) {
      throw new BadRequestException(
        `Failed to update question inputs: ${deleteError.message}`,
      );
    }

    if (inputs.length === 0) {
      return;
    }

    const { error: insertError } = await this.supabaseAdmin
      .from("question_inputs")
      .insert(
        inputs.map((input) => ({
          question_id: questionId,
          label: input.label,
          placeholder: input.placeholder ?? "",
          default_value: input.default_value ?? "",
        })),
      );

    if (insertError) {
      throw new BadRequestException(
        `Failed to create question inputs: ${insertError.message}`,
      );
    }
  }

  private async replaceValidationRules(
    questionId: string,
    rules: Record<string, ValidationRuleValue>,
  ): Promise<void> {
    const { error: deleteError } = await this.supabaseAdmin
      .from("validation_rules")
      .delete()
      .eq("question_id", questionId);

    if (deleteError) {
      throw new BadRequestException(
        `Failed to update validation rules: ${deleteError.message}`,
      );
    }

    const { error: insertError } = await this.supabaseAdmin
      .from("validation_rules")
      .insert({
        question_id: questionId,
        rules: rules as Json,
      });

    if (insertError) {
      throw new BadRequestException(
        `Failed to create validation rules: ${insertError.message}`,
      );
    }
  }

  private async deleteQuestion(questionId: string): Promise<void> {
    const { error: validationRulesError } = await this.supabaseAdmin
      .from("validation_rules")
      .delete()
      .eq("question_id", questionId);

    if (validationRulesError) {
      throw new BadRequestException(
        `Failed to delete validation rules: ${validationRulesError.message}`,
      );
    }

    const { error: questionInputsError } = await this.supabaseAdmin
      .from("question_inputs")
      .delete()
      .eq("question_id", questionId);

    if (questionInputsError) {
      throw new BadRequestException(
        `Failed to delete question inputs: ${questionInputsError.message}`,
      );
    }

    const { error: questionError } = await this.supabaseAdmin
      .from("questions")
      .delete()
      .eq("id", questionId);

    if (questionError) {
      throw new BadRequestException(
        `Failed to delete question: ${questionError.message}`,
      );
    }
  }

  private async deleteFormData(formId: string): Promise<void> {
    const { data: questions, error: questionsError } = await this.supabaseAdmin
      .from("questions")
      .select("id")
      .eq("form_id", formId);

    if (questionsError) {
      throw new BadRequestException(
        `Failed to delete form questions: ${questionsError.message}`,
      );
    }

    for (const question of questions ?? []) {
      await this.deleteQuestion(question.id);
    }

    const { data: submissions, error: submissionsError } =
      await this.supabaseAdmin
        .from("form_submissions")
        .select("id")
        .eq("form_id", formId);

    if (submissionsError) {
      throw new BadRequestException(
        `Failed to delete form submissions: ${submissionsError.message}`,
      );
    }

    const submissionIds = (submissions ?? []).map(
      (submission) => submission.id,
    );

    if (submissionIds.length > 0) {
      const { error: answersError } = await this.supabaseAdmin
        .from("answers")
        .delete()
        .in("submission_id", submissionIds);

      if (answersError) {
        throw new BadRequestException(
          `Failed to delete answers: ${answersError.message}`,
        );
      }

      const { error: formSubmissionsError } = await this.supabaseAdmin
        .from("form_submissions")
        .delete()
        .in("id", submissionIds);

      if (formSubmissionsError) {
        throw new BadRequestException(
          `Failed to delete form submissions: ${formSubmissionsError.message}`,
        );
      }
    }
  }
}
