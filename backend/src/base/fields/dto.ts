import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsArray } from 'class-validator';

export class FieldDto {
  @ApiProperty({ description: 'The name of the field', example: 'Soccer Field' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the field', required: false, example: 'SCR-FLD' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'The note of the field', required: false, example: 'Soccer field, 11v11' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'The active status of the field', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'The sport IDs of the field', required: false, example: [1] })
  @IsArray()
  @IsOptional()
  sportIds?: number[];

  @ApiProperty({ description: 'The country ID of the field', required: false, example: 1 })
  @IsInt()
  @IsOptional()
  countryId?: number;

  @ApiProperty({ description: 'The order of the field', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number = 0;

  @ApiProperty({ description: 'The base64 of the field', required: false, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIElEQVR4nO3RMQoAIAxF0QYhuiSEsLJ4iVUQAh6fUfQFTdP08ZJEOZ6CKMiK7pOc4HkeMeEkXZI6IWZACBAChAAhQAgQAoQAIUAIEAKEACHQIpAqA1pEomUkmUDSAAAAAElFTkSuQmCC' })
  @IsString()
  @IsOptional()
  base64?: string;
}