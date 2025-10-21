import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) { }

  async create(createSportDto: CreateSportDto) {
    return await this.prisma.baseSport.create({
      data: createSportDto
    });
  }

  async findAll(active?: boolean) {
    const where = active !== undefined 
      ? { isActive: active } as Prisma.BaseSportWhereInput
      : undefined;

    return await this.prisma.baseSport.findMany({
      where,
      orderBy: { ord: 'asc' }
    });
  }

  async findOne(id: number) {
    const sport = await this.prisma.baseSport.findUnique({
      where: { id: Number(id) }
    });

    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }

    return sport;
  }

  async update(id: number, updateSportDto: UpdateSportDto) {
    try {
      return await this.prisma.baseSport.update({
        where: { id: Number(id) },
        data: updateSportDto
      });
    } catch (error) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    // Validate id
    if (id === undefined || id === null || isNaN(id)) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id is a number and exists
      const sport = await this.prisma.baseSport.findUnique({
        where: { id: Number(id) }
      });

      if (!sport) {
        throw new NotFoundException(`Sport with ID ${id} not found`);
      }

      // Perform delete
      return await this.prisma.baseSport.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete sport error:', error);
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }
  }

  async removeMany(ids: number[]) {
    return await this.prisma.baseSport.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: number]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return this.prisma.baseSport.update({
        where: { id: Number(id) },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
