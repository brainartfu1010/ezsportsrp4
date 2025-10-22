import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class EventTypeDto {
  @ApiProperty({ description: 'Name of the event type' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the event type', required: false })
  @IsOptional()
  @IsString()
  abbr?: string;

  @ApiProperty({ description: 'Sport ID of the event type', required: false })
  @IsOptional()
  @IsNumber()
  sportId?: number;

  @ApiProperty({ description: 'Category of the event type', required: false })
  @IsOptional()
  @IsNumber()
  category?: number;

  @ApiProperty({ description: 'Evaluation metric of the event type', required: false })
  @IsOptional()
  @IsNumber()
  evaluationMetric?: number;

  @ApiProperty({ description: 'Code of the event type', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Whether the event type is visible' })
  @IsNotEmpty()
  @IsBoolean()
  isVisible: boolean;

  @ApiProperty({ description: 'Note for the event type', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Order of the event type', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;

  @ApiProperty({ description: 'Score of the event type' })
  @IsNotEmpty()
  @IsNumber()
  score: number;

  @ApiProperty({ description: 'Slot of the event type' })
  @IsNotEmpty()
  @IsNumber()
  slot: number;
}
