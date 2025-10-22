import { Injectable, NotFoundException } from '@nestjs/common';
import { FieldDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { AvatarUtils } from 'src/utils/avatar.utils';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) { }

  async create(fieldDto: FieldDto) {
    const { base64, ...createData } = fieldDto;

    const result = await this.prisma.baseField.create({
      data: createData
    });

    AvatarUtils.saveBase64(base64, 'fields', result.id);

    return result;
  }

  async findAll(
    active?: boolean,
    sportId?: number | number[],
    countryId?: number
  ) {
    const where: Prisma.BaseFieldWhereInput = {
      ...(active !== undefined ? { isActive: active } : {}),
      ...(sportId !== undefined
        ? {
          sportIds: Array.isArray(sportId)
            ? { hasSome: sportId.map(id => Number(id)) }
            : { has: Number(sportId) }
        }
        : {}
      ),
      ...(countryId !== undefined ? { countryId: Number(countryId) } : {})
    } as Prisma.BaseFieldWhereInput;

    const fields = await this.prisma.baseField.findMany({
      where,
      orderBy: { ord: 'asc' }
    });

    // Attach avatars
    return Promise.all(fields.map(async field => ({
      ...field,
      base64: AvatarUtils.getBase64('fields', field.id) || undefined
    })));
  }

  async findOne(id: number) {
    const field = await this.prisma.baseField.findUnique({
      where: { id: Number(id) }
    });

    if (!field) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }

    const base64 = AvatarUtils.getBase64('fields', id);

    return {
      ...field,
      base64
    };
  }

  async update(id: number, fieldDto: FieldDto) {
    try {
      const { base64, ...updateData } = fieldDto;

      const result = await this.prisma.baseField.update({
        where: { id: Number(id) },
        data: updateData
      });

      AvatarUtils.saveBase64(base64, 'fields', id);

      return result;
    } catch (error) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    // Validate id
    if (id === undefined || id === null || isNaN(id)) {
      throw new NotFoundException('Invalid ID provided for deletion');
    }

    try {
      // Ensure id is a number and exists
      const field = await this.prisma.baseField.findUnique({
        where: { id: Number(id) }
      });

      if (!field) {
        throw new NotFoundException(`Field with ID ${id} not found`);
      }

      AvatarUtils.deleteBase64('fields', id);

      // Perform delete
      return await this.prisma.baseField.delete({
        where: { id: Number(id) }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete field error:', error);
      throw new NotFoundException(`Field with ID ${id} not found`);
    }
  }

  async removeMany(ids: number[]) {
    for (const id of ids) {
      AvatarUtils.deleteBase64('fields', id);
    }
    return await this.prisma.baseField.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: number]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return this.prisma.baseField.update({
        where: { id: Number(id) },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }

  async findByCountryId(countryId: number) {
    return await this.prisma.baseField.findMany({
      where: {
        countryId: Number(countryId)
      } as Prisma.BaseFieldWhereInput
    });
  }
}
