import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PlayerPositionDto {
  @ApiProperty({ description: 'Name of the player position' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the player position' })
  @IsNotEmpty()
  @IsString()
  abbr: string;

  @ApiProperty({ description: 'Note for the player position', required: false })
  @IsOptional()
  @IsString()
  note?: string;

  @ApiProperty({ description: 'Sport ID of the player position' })
  @IsNotEmpty()
  @IsNumber()
  sportId: number;

  @ApiProperty({ description: 'Order of the player position', required: false })
  @IsOptional()
  @IsNumber()
  ord?: number;
}
