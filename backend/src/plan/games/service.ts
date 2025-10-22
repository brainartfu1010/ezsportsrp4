import { Injectable, NotFoundException } from '@nestjs/common';
import { GameDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanGamesService {
  constructor(private prisma: PrismaService) { }

  async create(gameDto: GameDto) {
    const { base64, ...createData } = gameDto;

    const game = await (this.prisma as any).planGame.create({
      data: {
        ...gameDto,
        status: gameDto.status ?? 'scheduled',
        isScrimmage: gameDto.isScrimmage ?? 0
      }
    });

    AvatarUtils.saveBase64(base64, 'games', game.id);

    return game;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Decimal;
    where?: Prisma.InputJsonObject;
    orderBy?: Prisma.InputJsonObject | Prisma.SortOrder;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const games = await (this.prisma as any).planGame.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: orderBy ?? { startDatetime: 'asc' }
    });

    return Promise.all(games.map(async game => ({
      ...game,
      base64: await AvatarUtils.getBase64('games', game.id) || undefined
    })));
  }

  async findOne(id: string) {
    const game = await (this.prisma as any).planGame.findUnique({
      where: { id }
    });

    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }

    return {
      ...game,
      base64: await AvatarUtils.getBase64('games', game.id) || undefined
    };
  }

  async update(id: string, gameDto: GameDto) {
    try {
      const { base64, ...gameData } = gameDto;

      AvatarUtils.saveBase64(base64, 'games', id);

      const game = await (this.prisma as any).planGame.update({
        where: { id },
        data: gameDto
      });

      return game;
    } catch (error) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      // Validate id
      if (id === undefined || id === null) {
        throw new NotFoundException('Invalid ID provided for deletion');
      }

      // Ensure id exists
      const game = await (this.prisma as any).planGame.findUnique({
        where: { id }
      });

      if (!game) {
        throw new NotFoundException(`Game with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('games', id);

      // Perform delete
      return await (this.prisma as any).planGame.delete({
        where: { id }
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete game error:', error);
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    ids.forEach(id => AvatarUtils.deleteBase64('games', id));

    return await (this.prisma as any).planGame.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).planGame.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
