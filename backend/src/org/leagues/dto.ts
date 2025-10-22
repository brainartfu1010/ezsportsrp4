import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt, IsDecimal } from 'class-validator';

export class CreateLeagueDto {
  @ApiProperty({ description: 'The name of the league', example: 'Premier League' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The abbreviation of the league', required: false, example: 'PL' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'Description of the league', required: false, example: 'Top-tier football league in England' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'Game mode ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  gameModeId?: string;

  @ApiProperty({ description: 'Group level ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  groupLevelId?: string;

  @ApiProperty({ description: 'Season of the league', required: false, example: '2023-2024' })
  @IsString()
  @IsOptional()
  season?: string;

  @ApiProperty({ description: 'Start date of the league', required: false, example: '2023-08-01' })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiProperty({ description: 'End date of the league', required: false, example: '2024-05-31' })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiProperty({ description: 'Registration deadline', required: false, example: '2023-07-15' })
  @IsDate()
  @IsOptional()
  registrationDeadline?: Date;

  @ApiProperty({ description: 'Maximum number of teams', required: false, example: 20 })
  @IsInt()
  @IsOptional()
  maxTeams?: number;

  @ApiProperty({ description: 'Entry fee for the league', required: false, example: 500.00 })
  @IsDecimal()
  @IsOptional()
  entryFee?: string;

  @ApiProperty({ description: 'Subscribe email for the league', required: false, example: 'league@example.com' })
  @IsString()
  @IsOptional()
  subscribeEmail?: string;

  @ApiProperty({ description: 'League rules', required: false, example: 'Standard football league rules' })
  @IsString()
  @IsOptional()
  rules?: string;

  @ApiProperty({ description: 'Status of the league', required: false, example: 'active' })
  @IsString()
  @IsOptional()
  status?: string = 'active';

  @ApiProperty({ description: 'Order of the league', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number = 0;

  @ApiProperty({ description: 'The base64 of the league logo', required: false, example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAABIElEQVR4nO3RMQoAIAxF0QYhuiSEsLJ4iVUQAh6fUfQFTdP08ZJEOZ6CKMiK7pOc4HkeMeEkXZI6IWZACBAChAAhQAgQAoQAIUAIEAKEACHQIpAqA1pEomUkmUDSAAAAAElFTkSuQmCC' })
  @IsString()
  @IsOptional()
  base64?: string;
}

export class UpdateLeagueDto extends CreateLeagueDto {
  // Inherits all properties from CreateLeagueDto
  // Can add additional validation or properties specific to update if needed
}
