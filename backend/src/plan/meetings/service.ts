import { Injectable, NotFoundException } from '@nestjs/common';
import { MeetingDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { AvatarUtils } from '../../utils/avatar.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlanMeetingsService {
  constructor(private prisma: PrismaService) {}

  async create(meetingDto: MeetingDto) {
    const { base64, ...meetingData } = meetingDto;

    const meeting = await (this.prisma as any).planMeeting.create({
      data: {
        ...meetingData,
        status: meetingDto.status ?? 1
      }
    });

    AvatarUtils.saveBase64(base64, 'meetings', meeting.id);

    return meeting;
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.Decimal;
    where?: Prisma.InputJsonObject;
    orderBy?: Prisma.InputJsonObject | Prisma.SortOrder;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    const meetings = await (this.prisma as any).planMeeting.findMany({
      skip,
      take,
      cursor: cursor ? { id: cursor } : undefined,
      where,
      orderBy: orderBy ?? { startDatetime: 'asc' }
    });

    return Promise.all(meetings.map(async meeting => ({
      ...meeting,
      base64: await AvatarUtils.getBase64('meetings', meeting.id) || undefined
    })));
  }

  async findOne(id: string) {
    const meeting = await (this.prisma as any).planMeeting.findUnique({ 
      where: { id }
    });

    if (!meeting) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }

    return {
      ...meeting,
      base64: await AvatarUtils.getBase64('meetings', meeting.id) || undefined
    };
  }

  async update(id: string, meetingDto: MeetingDto) {
    try {
      const { base64, ...meetingData } = meetingDto;

      AvatarUtils.saveBase64(base64, 'meetings', id);

      const meeting = await (this.prisma as any).planMeeting.update({
        where: { id },
        data: meetingDto
      });

      return meeting;
    } catch (error) {
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      const meeting = await (this.prisma as any).planMeeting.findUnique({
        where: { id }
      });

      if (!meeting) {
        throw new NotFoundException(`Meeting with ID ${id} not found`);
      }

      // Delete avatar if exists
      AvatarUtils.deleteBase64('meetings', id);

      // Perform delete
      return await (this.prisma as any).planMeeting.delete({ 
        where: { id } 
      });
    } catch (error) {
      // Log the original error for debugging
      console.error('Delete meeting error:', error);
      throw new NotFoundException(`Meeting with ID ${id} not found`);
    }
  }

  async removeMany(ids: string[]) {
    // Delete avatars for all meetings being deleted
    ids.forEach(id => AvatarUtils.deleteBase64('meetings', id));

    return await (this.prisma as any).planMeeting.deleteMany({
      where: { id: { in: ids } }
    });
  }

  async reorder(orders: { [key: string]: number }[]) {
    const updatePromises = orders.map(async (item) => {
      const [id, ord] = Object.entries(item)[0]; // Extract the only key-value pair
      return (this.prisma as any).planMeeting.update({
        where: { id },
        data: { ord },
      });
    });

    return Promise.all(updatePromises);
  }
}
