import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class CreateAnswerDto {
  @IsString()
  @IsNotEmpty()
  question_id: string;

  @IsString()
  value: string;
}

export class CreateFormSubmissionDto {
  @IsString()
  @IsNotEmpty()
  form_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAnswerDto)
  answers: CreateAnswerDto[];
}

export class UpdateFormSubmissionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  form_id?: string;
}
