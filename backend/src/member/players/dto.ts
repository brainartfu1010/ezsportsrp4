import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class PlayerDto {
  @ApiProperty({ description: 'Person ID of the player' })
  @IsNotEmpty()
  @IsDecimal()
  personId: number;

  @ApiProperty({ description: 'Height of the player', required: false })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ description: 'Weight of the player', required: false })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ description: 'Preferred foot', required: false })
  @IsOptional()
  @IsString()
  preferredFoot?: string;

  @ApiProperty({ description: 'Contract start date', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contractStart?: Date;

  @ApiProperty({ description: 'Contract end date', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contractEnd?: Date;

  @ApiProperty({ description: 'Emergency contact name', required: false })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({ description: 'Emergency contact phone', required: false })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({ description: 'Status of the player' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Bio of the player', required: false })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ description: 'Order of the player' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
