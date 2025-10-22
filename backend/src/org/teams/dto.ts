import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, IsInt, IsUUID } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({ description: 'The name of the team', example: 'Manchester United' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the team', required: false, example: 'MUN' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'The club ID of the team', required: true, example: 'uuid-of-club' })
  @IsUUID()
  clubId: string;

  @ApiProperty({ description: 'The sport ID of the team', required: true, example: 'uuid-of-sport' })
  @IsUUID()
  sportId: string;

  @ApiProperty({ description: 'The color associated with the team', required: false, example: '#FF0000' })
  @IsString()
  @IsOptional()
  color?: string;

  @ApiProperty({ description: 'Additional notes about the team', required: false, example: 'Premier League team' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'The active status of the team', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;

  @ApiProperty({ description: 'The order of the team', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number = 0;

  @ApiProperty({ description: 'The base64 of the team logo', required: false, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIElEQVR4nO3RMQoAIAxF0QYhuiSEsLJ4iVUQAh6fUfQFTdP08ZJEOZ6CKMiK7pOc4HkeMeEkXZI6IWZACBAChAAhQAgQAoQAIUAIEAKEACHQIpAqA1pEomUkmUDSAAAAAElFTkSuQmCC' })
  @IsString()
  @IsOptional()
  base64?: string;
}

export class UpdateTeamDto extends CreateTeamDto {
  // Inherits all properties from CreateTeamDto
  // Can add additional validation or properties specific to update if needed
}
