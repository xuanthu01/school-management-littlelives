import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'
export class QueryTrackingDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  class_id: number

}