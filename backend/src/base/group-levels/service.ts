import { Injectable, NotFoundException } from '@nestjs/common';
import { GroupLevelDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GroupLevelsService {
  constructor(private prisma: PrismaService) {}

  async create(groupLevelDto: GroupLevelDto) {
    const groupLevel = await (this.prisma as any).baseGroupLevel.create({
      data: {
        ...groupLevelDto,
        status: groupLevelDto.status ?? 'active',
        isActive: groupLevelDto.isActive ?? true
      }
    });

    return groupLevel;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.BaseFieldWhereUniqueInput;
    where?: Prisma.BaseFieldWhereInput;
    orderBy?: Prisma.BaseFieldOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return await (this.prisma as any).baseGroupLevel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy ?? { name: 'asc' }
    });
  }

  async findOne(id: string) {
    const groupLevel = await (this.prisma as any).baseGroupLevel.findUnique({ 
      where: { id }
    });

    if (!groupLevel) {
      throw new NotFoundException(`Group Level with ID ${id} not found`);
    }

    return groupLevel;
  }

  async update(id: string, groupLevelDto: GroupLevelDto) {
    try {
      const groupLevel = await (this.prisma as any).baseGroupLevel.update({
        where: { id },
        data: groupLevelDto
      });

      return groupLevel;
    } catch (error) {
      throw new NotFoundException(`Group Level with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await (this.prisma as any).baseGroupLevel.delete({ 
        where: { id } 
      });
    } catch (error) {
      throw new NotFoundException(`Group Level with ID ${id} not found`);
    }
  }
}
