import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AvatarUtils } from '../../utils/avatar.utils';

@Injectable()
export class SportsService {
  constructor(private prisma: PrismaService) { }

  async create(createSportDto: CreateSportDto) {
    const { base64, ...createData } = createSportDto;

    const sport = await this.prisma.baseSport.create({
      data: createData
    });

    if (base64) {
      AvatarUtils.saveBase64(base64, 'sports', sport.id);
    } else if (base64 === null) {
      AvatarUtils.deleteBase64('sports', sport.id);
    }

    return sport;
  }

  async findAll(active?: boolean) {
    const sports = await this.prisma.baseSport.findMany({
      where: active !== undefined
        ? { isActive: active } as Prisma.BaseSportWhereInput
        : undefined,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(sports.map(async sport => ({
      ...sport,
      base64: await AvatarUtils.getBase64('sports', sport.id) || undefined
    })));
  }

  async findOne(id: number) {
    const sport = await this.prisma.baseSport.findUnique({
      where: { id: Number(id) }
    });

    if (!sport) {
      throw new NotFoundException(`Sport with ID ${id} not found`);
    }

    // Attach avatar
    return {
      ...sport,
      base64: await AvatarUtils.getBase64('sports', sport.id) || undefined
    };
  }

  async update(id: number, updateSportDto: UpdateSportDto) {
    try {
      const { base64, ...updateData } = updateSportDto;

      if (base64) {
        AvatarUtils.saveBase64(base64, 'sports', id);
      } else if (base64 === null) {
        AvatarUtils.deleteBase64('sports', id);
      }

      const sport = await this.prisma.baseSport.update({
        where: { id: Number(id) },
        data: updateData
      });

      return sport;
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

      // Delete avatar if exists
      AvatarUtils.deleteBase64('sports', id);

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
    // Delete avatars for all sports being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('sports', id));

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
