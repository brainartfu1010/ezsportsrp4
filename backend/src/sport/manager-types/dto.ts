import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ManagerTypeDto {
  @ApiProperty({ description: 'Name of the manager type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the manager type' })
  @IsNotEmpty()
  @IsString()
  abbr: string;

  @ApiProperty({ description: 'Color of the manager type' })
  @IsNotEmpty()
  @IsString()
  color: string;

  @ApiProperty({ description: 'Sport ID of the manager type', required: false })
  @IsOptional()
  @IsNumber()
  sportId?: number;

  @ApiProperty({ description: 'Note for the manager type', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Whether the manager type is active' })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'Order of the manager type' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;
}
