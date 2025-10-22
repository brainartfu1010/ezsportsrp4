import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal } from 'class-validator';

export class CoachDto {
  @ApiProperty({ description: 'Person ID of the coach' })
  @IsNotEmpty()
  @IsDecimal()
  personId: number;

  @ApiProperty({ description: 'License number of the coach', required: false })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({ description: 'Certification of the coach', required: false })
  @IsOptional()
  @IsString()
  certification?: string;

  @ApiProperty({ description: 'Specialization of the coach', required: false })
  @IsOptional()
  @IsString()
  specialization?: string;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the coach' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Bio of the coach', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the coach', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
