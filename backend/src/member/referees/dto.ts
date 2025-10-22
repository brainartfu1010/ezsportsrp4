import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal } from 'class-validator';

export class RefereeDto {
  @ApiProperty({ description: 'Person ID of the referee' })
  @IsNotEmpty()
  @IsDecimal()
  personId: number;

  @ApiProperty({ description: 'License number of the referee' })
  @IsNotEmpty()
  @IsString()
  licenseNumber: string;

  @ApiProperty({ description: 'License level of the referee', required: false })
  @IsOptional()
  @IsString()
  licenseLevel?: string;

  @ApiProperty({ description: 'Certification of the referee', required: false })
  @IsOptional()
  @IsString()
  certification?: string;

  @ApiProperty({ description: 'Referee type' })
  @IsNotEmpty()
  @IsString()
  refereeType: string;

  @ApiProperty({ description: 'Specialization of the referee', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({ description: 'Languages spoken', required: false })
  @IsOptional()
  @IsString()
  languages?: string;

  @ApiProperty({ description: 'Match fee', required: false })
  @IsOptional()
  @IsNumber()
  matchFee?: number;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the referee' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Bio of the referee', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the referee' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
