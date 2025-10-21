import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FieldsService {
  constructor(private prisma: PrismaService) { }

  async create(createFieldDto: CreateFieldDto) {
    return await this.prisma.baseField.create({
      data: createFieldDto
    });
  }

  async findAll(
    active?: boolean, 
    sportId?: number | number[], 
    countryId?: number
  ) {
    const where: Prisma.BaseFieldWhereInput = {
      ...(active !== undefined ? { isActive: active } : {}),
      ...(sportId !== undefined 
        ? { sportIds: Array.isArray(sportId) 
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

    // Fetch related countries and sports for each field
    const fieldsWithRelations = await Promise.all(fields.map(async (field) => {
      // Fetch country if countryId exists
      const country = field.countryId 
        ? await this.prisma.baseCountry.findUnique({ 
            where: { id: field.countryId } 
          }) 
        : null;

      // Fetch sports for the field
      const sports = field.sportIds && field.sportIds.length > 0
        ? await this.prisma.baseSport.findMany({
            where: { 
              id: { in: field.sportIds },
              isActive: true
            }
          })
        : [];

      return {
        ...field,
        country,
        sports
      };
    }));

    return fieldsWithRelations;
  }

  async findOne(id: number) {
    const field = await this.prisma.baseField.findUnique({
      where: { id: Number(id) }
    });

    if (!field) {
      throw new NotFoundException(`Field with ID ${id} not found`);
    }

    return field;
  }

  async update(id: number, updateFieldDto: UpdateFieldDto) {
    try {
      return await this.prisma.baseField.update({
        where: { id: Number(id) },
        data: updateFieldDto
      });
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
