import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CoachTypeDto {
  @ApiProperty({ description: 'Name of the coach type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Sport ID of the coach type' })
  @IsNotEmpty()
  @IsNumber()
  sportId: number;

  @ApiProperty({ description: 'Abbreviation of the coach type' })
  @IsNotEmpty()
  @IsString()
  abbr: string;

  @ApiProperty({ description: 'Color of the coach type' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ description: 'Note of the coach type' })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Whether the coach type is active' })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Order of the coach type' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;
  
  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
