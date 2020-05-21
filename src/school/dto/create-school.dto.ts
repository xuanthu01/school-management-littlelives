import { IsString, IsOptional } from "class-validator";
import { PaymentType } from "../school.entity";

export class CreateSchoolDto {
  @IsString()
  name: string

  @IsString()
  @IsOptional()
  payment_type: PaymentType

  @IsString()
  owner_id: string

  @IsString()
  @IsOptional()
  parent_id: string
}