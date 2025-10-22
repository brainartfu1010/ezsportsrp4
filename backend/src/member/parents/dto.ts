import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal } from 'class-validator';

export class ParentDto {
  @ApiProperty({ description: 'Person ID of the parent' })
  @IsNotEmpty()
  @IsDecimal()
  personId: number;

  @ApiProperty({ description: 'Status of the parent' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Notes about the parent', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Order of the parent' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
