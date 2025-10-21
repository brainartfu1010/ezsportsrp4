import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AdminCountriesService {
  constructor(private prisma: PrismaService) { }

  async create(createCountryDto: CreateCountryDto) {
    console.log("Creating country:", createCountryDto);
  
    return await this.prisma.baseCountry.create({
      data: {
        ...createCountryDto,
        isActive: createCountryDto.isActive ?? true,
        ord: createCountryDto.ord ?? (await this.determineNextOrder())
      }
    });
  }

  // Helper method to determine the next order value
  private async determineNextOrder(): Promise<number> {
    const lastCountry = await this.prisma.baseCountry.findFirst({
      orderBy: { ord: 'desc' }
    });

    return lastCountry ? lastCountry.ord + 1 : 0;
  }

  async findAll(active?: boolean) {
    const where = active !== undefined 
      ? { isActive: active } as Prisma.BaseCountryWhereInput
      : undefined;

    return await this.prisma.baseCountry.findMany({
      where,
      orderBy: { ord: 'asc' }
    });
  }

  async findOne(id: number) {
    const country = await this.prisma.baseCountry.findUnique({
      where: { id: Number(id) }
    });

    if (!country) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }

    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    try {
      return await this.prisma.baseCountry.update({
        where: { id: Number(id) },
        data: updateCountryDto
      });
    } catch (error) {
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    // Validate id
    if (id === undefined || id === null || isNaN(id)) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id is a number and exists
      const country = await this.prisma.baseCountry.findUnique({
        where: { id: Number(id) }
      });

      if (!country) {
        throw new NotFoundException(`Country with ID ${id} not found`);
      }

      // Perform delete
      return await this.prisma.baseCountry.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete country error:', error);
      throw new NotFoundException(`Country with ID ${id} not found`);
    }
  }

  async removeMany(ids: number[]) {
    return await this.prisma.baseCountry.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: number]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return this.prisma.baseCountry.update({
        where: { id: Number(id) },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
