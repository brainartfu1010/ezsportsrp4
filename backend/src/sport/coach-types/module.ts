import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CoachTypeService } from './service';
import { AdminCoachTypeController } from './ctrl.admin';
import { HomeCoachTypeController } from './ctrl.home';
import { CoachTypeDto } from './dto';

@Module({
  controllers: [AdminCoachTypeController, HomeCoachTypeController],
  providers: [CoachTypeService, CoachTypeDto],
  imports: [PrismaModule],
  exports: [CoachTypeService]
})
export class CoachTypeModule { }
