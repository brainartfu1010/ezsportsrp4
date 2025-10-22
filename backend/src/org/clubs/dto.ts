import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt, IsDecimal } from 'class-validator';

export class ClubDto {
  @ApiProperty({ description: 'The name of the club', example: 'Manchester United FC' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the club', required: false, example: 'MUFC' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'Description of the club', required: false, example: 'Professional football club based in Manchester, England' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'Founding date of the club', required: false, example: '1878-01-01' })
  @IsDate()
  @IsOptional()
  foundedDate?: Date;

  @ApiProperty({ description: 'Home stadium of the club', required: false, example: 'Old Trafford' })
  @IsString()
  @IsOptional()
  stadium?: string;

  @ApiProperty({ description: 'Club website URL', required: false, example: 'https://www.manutd.com' })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'Club contact email', required: false, example: 'contact@manutd.com' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Club contact phone number', required: false, example: '+44 161 868 8000' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Club address', required: false, example: 'Sir Matt Busby Way, Old Trafford, Manchester M16 0RA, UK' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({ description: 'Club registration number', required: false, example: 'FC123456' })
  @IsString()
  @IsOptional()
  registrationNumber?: string;

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
