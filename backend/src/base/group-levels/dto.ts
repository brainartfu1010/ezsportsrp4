import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt, IsBoolean } from 'class-validator';

export class GroupLevelDto {
  @ApiProperty({ description: 'Name of the group level', example: 'Professional' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Abbreviation of the group level', required: false, example: 'PRO' })
  @IsString()
  @IsOptional()
  abbr?: string;

  @ApiProperty({ description: 'Description or note about the group level', required: false, example: 'Highest competitive level' })
  @IsString()
  @IsOptional()
  note?: string;

  @ApiProperty({ description: 'Status of the group level', required: false, example: 'active' })
  @IsString()
  @IsOptional()
  status?: string = 'active';

  @ApiProperty({ description: 'Order of the group level', required: false, example: 0 })
  @IsInt()
  @IsOptional()
  ord?: number = 0;

  @ApiProperty({ description: 'Whether the group level is active', required: false, example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}