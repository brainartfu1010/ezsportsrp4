import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt, IsDecimal } from 'class-validator';

export class GameDto {
  @ApiProperty({ description: 'League ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  leagueId?: string;

  @ApiProperty({ description: 'Game name', required: false, example: 'Friendly Match' })
  @IsString()
  @IsOptional()
  gameName?: string;

  @ApiProperty({ description: 'Home Team ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  homeTeamId?: string;

  @ApiProperty({ description: 'Away Team ID', required: false, example: '2' })
  @IsDecimal()
  @IsOptional()
  awayTeamId?: string;

  @ApiProperty({ description: 'Start datetime', required: true, example: '2023-01-01T10:00:00Z' })
  @IsDate()
  startDatetime: Date;

  @ApiProperty({ description: 'End datetime', required: true, example: '2023-01-01T12:00:00Z' })
  @IsDate()
  endDatetime: Date;

  @ApiProperty({ description: 'Game duration in minutes', required: false, example: 90 })
  @IsInt()
  @IsOptional()
  duration?: number;

  @ApiProperty({ description: 'Uniform details', required: false, example: 'Home team white, Away team blue' })
  @IsString()
  @IsOptional()
  uniform?: string;

  @ApiProperty({ description: 'Location ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  locationId?: string;

  @ApiProperty({ description: 'Is this a scrimmage', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  isScrimmage?: number = 0;

  @ApiProperty({ description: 'Status of the game', required: false, example: 'scheduled' })
  @IsString()
  @IsOptional()
  status?: string = 'scheduled';

  @ApiProperty({ description: 'Created by user ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  createdBy?: string;

  @ApiProperty({ description: 'Base64 of game-related image', required: false })
  @IsString()
  @IsOptional()
  base64?: string;
}
