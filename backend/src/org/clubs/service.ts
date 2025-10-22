import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClubDto, UpdateClubDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  async create(createClubDto: CreateClubDto) {
    const { base64, ...createData } = createClubDto;

    const club = await (this.prisma as any).orgClub.create({
      data: {
        ...createData,
        status: createData.status ?? 'active'
      }
    });

    AvatarUtils.saveBase64(base64, 'clubs', club.id);

    return club;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OrgClubWhereUniqueInput;
    where?: Prisma.OrgClubWhereInput;
    orderBy?: Prisma.OrgClubOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const clubs = await (this.prisma as any).orgClub.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy: orderBy ?? { name: 'asc' }
    });

    return Promise.all(clubs.map(async club => ({
      ...club,
      base64: await AvatarUtils.getBase64('clubs', club.id) || undefined
    })));
  }

  async findOne(id: string) {
    const club = await (this.prisma as any).orgClub.findUnique({ 
      where: { id }
    });

    if (!club) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }

    return {
      ...club,
      base64: await AvatarUtils.getBase64('clubs', club.id) || undefined
    };
  }

  async update(id: string, updateClubDto: UpdateClubDto) {
    try {
      const { base64, ...updateData } = updateClubDto;

      AvatarUtils.saveBase64(base64, 'clubs', id);

      const club = await (this.prisma as any).orgClub.update({
        where: { id },
        data: updateData
      });

      return club;
    } catch (error) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      AvatarUtils.deleteBase64('clubs', id);

      return await (this.prisma as any).orgClub.delete({ 
        where: { id } 
      });
    } catch (error) {
      throw new NotFoundException(`Club with ID ${id} not found`);
    }
  }
}
