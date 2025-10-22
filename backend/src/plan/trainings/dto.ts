import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsDate, IsInt, IsDecimal } from 'class-validator';

export class TrainingDto {
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

  @ApiProperty({ description: 'Training content', required: false, example: 'Strength and conditioning' })
  @IsString()
  @IsOptional()
  trainingContent?: string;

  @ApiProperty({ description: 'Is training for all members', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  isAllMembers?: number = 0;

  @ApiProperty({ description: 'Location ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  locationId?: string;

  @ApiProperty({ description: 'Recurring type', required: false, example: 1 })
  @IsInt()
  @IsOptional()
  recurringType?: number = 1;

  @ApiProperty({ description: 'Status of the training', required: false, example: 'scheduled' })
  @IsString()
  @IsOptional()
  status?: string = 'scheduled';

  @ApiProperty({ description: 'Created by user ID', required: false, example: '1' })
  @IsDecimal()
  @IsOptional()
  createdBy?: string;

  @ApiProperty({ description: 'Base64 of training-related image', required: false })
  @IsString()
  @IsOptional()
  base64?: string;
}
