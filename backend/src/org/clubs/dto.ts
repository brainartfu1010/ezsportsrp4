import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt } from 'class-validator';

export class CreateClubDto {
  @ApiProperty({ description: 'The name of the club', example: 'Manchester United FC' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the club', required: false, example: 'MUN' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'Description of the club', required: false, example: 'Premier League football club' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Date the club was founded', required: false, example: '1878-01-01' })
  @IsDate()
  @IsOptional()
  foundedDate?: Date;

  @ApiProperty({ description: 'Club address', required: false, example: '123 Football Rd, Manchester, UK' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Contact email', required: false, example: 'contact@manutd.com' })
  @IsString()
  @IsOptional()
  contactEmail?: string;

  @ApiProperty({ description: 'Contact phone number', required: false, example: '+44 123 456 7890' })
  @IsString()
  @IsOptional()
  contactPhone?: string;

  @ApiProperty({ description: 'Club website', required: false, example: 'https://www.manutd.com' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'Status of the club', required: false, example: 'active' })
  @IsString()
  @IsOptional()
  status?: string = 'active';

  @ApiProperty({ description: 'Order of the club', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number = 0;

  @ApiProperty({ description: 'The base64 of the club logo', required: false, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIElEQVR4nO3RMQoAIAxF0QYhuiSEsLJ4iVUQAh6fUfQFTdP08ZJEOZ6CKMiK7pOc4HkeMeEkXZI6IWZACBAChAAhQAgQAoQAIUAIEAKEACHQIpAqA1pEomUkmUDSAAAAAElFTkSuQmCC' })
  @IsString()
  @IsOptional()
  base64?: string;
}

export class UpdateClubDto extends CreateClubDto {
  // Inherits all properties from CreateClubDto
  // Can add additional validation or properties specific to update if needed
}
