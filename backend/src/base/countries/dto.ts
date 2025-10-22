import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CountryDto {
  @ApiProperty({ description: 'The name of the country', example: 'United States' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the country', required: false, example: 'USA' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'The code of the country', required: false, example: '+1' })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({ description: 'The note of the country', required: false, example: 'United States of America' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'The active status of the country', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'The order of the country', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number;

  @ApiProperty({ description: 'The base64 of the country', required: false, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIElEQVR4nO3RMQoAIAxF0QYhuiSEsLJ4iVUQAh6fUfQFTdP08ZJEOZ6CKMiK7pOc4HkeMeEkXZI6IWZACBAChAAhQAgQAoQAIUAIEAKEACHQIpAqA1pEomUkmUDSAAAAAElFTkSuQmCC' })
  @IsString()
  @IsOptional()
  base64?: string;
}
