import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ManagerTypeService } from './service';
import { AdminManagerTypeController } from './ctrl.admin';
import { HomeManagerTypeController } from './ctrl.home';
import { ManagerTypeDto } from './dto';

@Module({
  controllers: [AdminManagerTypeController, HomeManagerTypeController],
  providers: [ManagerTypeService, ManagerTypeDto],
  imports: [PrismaModule],
  exports: [ManagerTypeService]
})
export class ManagerTypeModule { }
