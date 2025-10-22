import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class TeamManagerDto {
  @ApiProperty({ description: 'Person ID of the team manager' })
  @IsNotEmpty()
  @IsDecimal()
  personId: number;

  @ApiProperty({ description: 'Appointed date of the team manager', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  appointedDate?: Date;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the team manager' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Bio of the team manager', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the team manager' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
