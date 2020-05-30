import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { PaymentType } from "../school.entity";

export class CreateSchoolDto {
  @IsString()
  @ApiProperty()
  name: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  payment_type: PaymentType

  @IsString()
  @ApiProperty()
  owner_id: string

  @IsString()
  @IsOptional()
  @ApiProperty()
  parent_id: string
}