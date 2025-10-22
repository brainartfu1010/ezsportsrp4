// import { ApiProperty } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt } from 'class-validator';

export class CreateSportDto {
  @ApiProperty({ description: 'The name of the sport', example: 'Soccer' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the sport', required: false, example: 'SCR' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'The color associated with the sport', required: false, example: '#FF0000' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: 'Additional notes about the sport', required: false, example: 'Most popular sport worldwide' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'The active status of the sport', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'The order of the sport', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number = 0;

  @ApiProperty({ description: 'The base64 of the sport logo', required: false, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIElEQVR4nO3RMQoAIAxF0QYhuiSEsLJ4iVUQAh6fUfQFTdP08ZJEOZ6CKMiK7pOc4HkeMeEkXZI6IWZACBAChAAhQAgQAoQAIUAIEAKEACHQIpAqA1pEomUkmUDSAAAAAElFTkSuQmCC' })
  @IsString()
  @IsOptional()
  base64?: string;
}

export class UpdateSportDto extends CreateSportDto {
  // Inherits all properties from CreateSportDto
  // Can add additional validation or properties specific to update if needed
}
