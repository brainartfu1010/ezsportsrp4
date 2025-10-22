import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt, IsDecimal } from 'class-validator';

export class MeetingDto {
  @ApiProperty({ description: 'Meeting category', required: false, example: 1 })
  @IsInt()
  @IsOptional()
  meetingCategory?: number;

  @ApiProperty({ description: 'Team ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  teamId?: string;

  @ApiProperty({ description: 'Start datetime', required: true, example: '2023-01-01T10:00:00Z' })
  @IsDate()
  startDatetime: Date;

  @ApiProperty({ description: 'End datetime', required: true, example: '2023-01-01T12:00:00Z' })
  @IsDate()
  endDatetime: Date;

  @ApiProperty({ description: 'Meeting title', required: false, example: 'Team Strategy Meeting' })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ description: 'Meeting content/description', required: false, example: 'Discuss upcoming tournament strategy' })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ description: 'Location ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  locationId?: string;

  @ApiProperty({ description: 'Status of the meeting', required: false, example: 1 })
  @IsInt()
  @IsOptional()
  status?: number = 1;

  @ApiProperty({ description: 'Created by user ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  createdBy?: string;

  @ApiProperty({ description: 'Base64 of meeting-related image', required: false })
  @IsString()
  @IsOptional()
  base64?: string;
}
