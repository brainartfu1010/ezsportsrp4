import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal } from 'class-validator';

export class ClubAdminDto {
  @ApiProperty({ description: 'Person ID of the club admin' })
  @IsNotEmpty()
  @IsDecimal()
  personId: number;

  @ApiProperty({ description: 'Club ID of the club admin' })
  @IsNotEmpty()
  @IsDecimal()
  clubId: number;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the club admin' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Bio of the club admin', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the club admin' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
