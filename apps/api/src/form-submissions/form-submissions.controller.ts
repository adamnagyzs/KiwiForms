import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import type {
  CreateFormSubmissionDto,
  DatabaseUser,
  FormSubmission,
  UpdateFormSubmissionDto,
} from "@kiwiforms/types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { Public } from "../auth/decorators/public.decorator";
import { FormSubmissionsService } from "./form-submissions.service";

@Controller("form-submissions")
export class FormSubmissionsController {
  constructor(
    private readonly formSubmissionsService: FormSubmissionsService,
  ) {}

  @Get()
  getFormSubmissions(
    @CurrentUser() user: DatabaseUser,
  ): Promise<FormSubmission[]> {
    return this.formSubmissionsService.getFormSubmissions(user.id);
  }

  @Get(":id")
  getFormSubmissionById(
    @CurrentUser() user: DatabaseUser,
    @Param("id") submissionId: string,
  ): Promise<FormSubmission> {
    return this.formSubmissionsService.getFormSubmissionById(
      user.id,
      submissionId,
    );
  }

  @Public()
  @Throttle({ default: { limit: 5, ttl: 60_000 } })
  @Post()
  createFormSubmission(
    @Body() body: CreateFormSubmissionDto,
  ): Promise<FormSubmission> {
    return this.formSubmissionsService.createFormSubmission(body);
  }

  @Patch(":id")
  updateFormSubmission(
    @CurrentUser() user: DatabaseUser,
    @Param("id") submissionId: string,
    @Body() body: UpdateFormSubmissionDto,
  ): Promise<FormSubmission> {
    return this.formSubmissionsService.updateFormSubmission(
      user.id,
      submissionId,
      body,
    );
  }

  @Delete(":id")
  @HttpCode(204)
  deleteFormSubmission(
    @CurrentUser() user: DatabaseUser,
    @Param("id") submissionId: string,
  ): Promise<void> {
    return this.formSubmissionsService.deleteFormSubmission(
      user.id,
      submissionId,
    );
  }
}
