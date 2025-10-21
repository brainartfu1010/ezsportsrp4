// import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';


export class CreateSportDto {
  @ApiProperty({ description: 'The name of the sport', example: 'Football' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the sport', required: false, example: 'FTB' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'The note of the sport', required: false, example: 'American football, contact team sport' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'The active status of the sport', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'The order of the sport', required: false })
  @IsInt()
  @IsOptional()
  ord?: number = 0;
}
