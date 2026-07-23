import { Type } from "class-transformer";
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  INPUT_TYPES,
  type InputType,
  type ValidationRuleValue,
} from "./forms";

export class ValidationRuleDto {
  @IsObject()
  rules: Record<string, ValidationRuleValue>;
}

export class CreateQuestionInputDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsOptional()
  @IsString()
  placeholder?: string;

  @IsOptional()
  @IsString()
  default_value?: string;
}

export class CreateQuestionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsIn(INPUT_TYPES)
  input_type: InputType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionInputDto)
  question_inputs: CreateQuestionInputDto[];

  @ValidateNested()
  @Type(() => ValidationRuleDto)
  validation_rules: ValidationRuleDto;
}

export class CreateFormDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionDto)
  questions: CreateQuestionDto[];
}

export class UpdateQuestionDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  id?: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsIn(INPUT_TYPES)
  input_type: InputType;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQuestionInputDto)
  question_inputs: CreateQuestionInputDto[];

  @ValidateNested()
  @Type(() => ValidationRuleDto)
  validation_rules: ValidationRuleDto;
}

export class UpdateFormDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionDto)
  questions?: UpdateQuestionDto[];
}

export type EditableQuestion = CreateQuestionDto & {
  id: string;
};
