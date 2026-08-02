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
import type {
  CreateFormDto,
  DatabaseUser,
  Form,
  UpdateFormDto,
} from "@kiwiforms/types";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { FormsService } from "./forms.service";

@Controller("forms")
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Get()
  getForms(@CurrentUser() user: DatabaseUser): Promise<Form[]> {
    return this.formsService.getForms(user.id);
  }

  @Get(":id")
  getFormForSubmission(
    @CurrentUser() user: DatabaseUser,
    @Param("id") formId: string,
  ): Promise<Form> {
    return this.formsService.getUserFormById(user.id, formId);
  }

  @Post()
  createForm(
    @CurrentUser() user: DatabaseUser,
    @Body() body: CreateFormDto,
  ): Promise<Form> {
    return this.formsService.createForm(user.id, body);
  }

  @Patch(":id")
  updateForm(
    @CurrentUser() user: DatabaseUser,
    @Param("id") formId: string,
    @Body() body: UpdateFormDto,
  ): Promise<Form> {
    return this.formsService.updateForm(user.id, formId, body);
  }

  @Delete(":id")
  @HttpCode(204)
  deleteForm(
    @CurrentUser() user: DatabaseUser,
    @Param("id") formId: string,
  ): Promise<void> {
    return this.formsService.deleteForm(user.id, formId);
  }
}
