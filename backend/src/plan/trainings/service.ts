import { Injectable, NotFoundException } from '@nestjs/common';
import { TrainingDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanTrainingsService {
  constructor(private prisma: PrismaService) {}

  async create(trainingDto: TrainingDto) {
    const { base64, ...trainingData } = trainingDto;

    const training = await (this.prisma as any).planTraining.create({
      data: {
        ...trainingData,
        status: trainingData.status ?? 'scheduled',
        isAllMembers: trainingData.isAllMembers ?? 0,
        recurringType: trainingData.recurringType ?? 1
      }
    });

    AvatarUtils.saveBase64(base64, 'trainings', training.id);

    return training;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Decimal;
    where?: Prisma.InputJsonObject;
    orderBy?: Prisma.InputJsonObject | Prisma.SortOrder;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const trainings = await (this.prisma as any).planTraining.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: orderBy ?? { startDatetime: 'asc' }
    });

    return Promise.all(trainings.map(async training => ({
      ...training,
      base64: await AvatarUtils.getBase64('trainings', training.id) || undefined
    })));
  }

  async findOne(id: string) {
    const training = await (this.prisma as any).planTraining.findUnique({ 
      where: { id }
    });

    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }

    return {
      ...training,
      base64: await AvatarUtils.getBase64('trainings', training.id) || undefined
    };
  }

  async update(id: string, trainingDto: TrainingDto) {
    try {
      const { base64, ...trainingData } = trainingDto;

      AvatarUtils.saveBase64(base64, 'trainings', id);

      const training = await (this.prisma as any).planTraining.update({
        where: { id },
        data: trainingDto
      });

      return training;
    } catch (error) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {

      const training = await (this.prisma as any).planTraining.findUnique({
        where: { id }
      });

      if (!training) {
        throw new NotFoundException(`Training with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('trainings', id);

      // Perform delete
      return await (this.prisma as any).planTraining.delete({ 
        where: { id } 
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete training error:', error);
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all trainings being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('trainings', id));

    return await (this.prisma as any).planTraining.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).planTraining.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
