import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSubDepartmentInput } from './create-sub-department.input';

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => CreateSubDepartmentInput)
  subDepartments?: CreateSubDepartmentInput[];
}