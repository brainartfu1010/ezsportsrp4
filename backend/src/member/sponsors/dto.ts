import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDate, IsDecimal } from 'class-validator';
import { Type } from 'class-transformer';

export class SponsorDto {
  @ApiProperty({ description: 'Company name of the sponsor' })
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @ApiProperty({ description: 'Contact person', required: false })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiProperty({ description: 'Email of the sponsor', required: false })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ description: 'Phone number of the sponsor', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Website of the sponsor', required: false })
  @IsOptional()
  @IsString()
  website?: string;

  @ApiProperty({ description: 'Sponsor level', required: false })
  @IsOptional()
  @IsString()
  sponsorLevel?: string;

  @ApiProperty({ description: 'Sponsorship amount', required: false })
  @IsOptional()
  @IsDecimal()
  sponsorshipAmount?: number;

  @ApiProperty({ description: 'Contract start date', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contractStart?: Date;

  @ApiProperty({ description: 'Contract end date', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  contractEnd?: Date;

  @ApiProperty({ description: 'Benefits of the sponsorship', required: false })
  @IsOptional()
  @IsString()
  benefits?: string;

  @ApiProperty({ description: 'Status of the sponsor' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Notes about the sponsor', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ description: 'Order of the sponsor' })
  @IsNotEmpty()
  @IsNumber()
  ord: number;

  @ApiProperty({ description: 'Base64 encoded logo image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
