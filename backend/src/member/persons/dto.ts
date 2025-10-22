import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsDecimal, IsDate, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class PersonDto {
  @ApiProperty({ description: 'First name of the person' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Last name of the person' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Email of the person', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number of the person', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Date of birth', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;

  @ApiProperty({ description: 'Gender', required: false })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ description: 'Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'City', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ description: 'State', required: false })
  @IsOptional()
  @IsString()
  state?: string;

  @ApiProperty({ description: 'Zip Code', required: false })
  @IsOptional()
  @IsString()
  zipCode?: string;

  @ApiProperty({ description: 'Country ID', required: false })
  @IsOptional()
  @IsDecimal()
  countryId?: number;

  @ApiProperty({ description: 'Status of the person' })
  @IsNotEmpty()
  @IsString()
  status: string;

  @ApiProperty({ description: 'Base64 encoded avatar image', required: false })
  @IsOptional()
  @IsString()
  base64?: string | null;
}
