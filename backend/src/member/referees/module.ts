import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RefereeService } from './service';
import { AdminRefereeController } from './ctrl.admin';
import { HomeRefereeController } from './ctrl.home';
import { RefereeDto } from './dto';

@Module({
  controllers: [AdminRefereeController, HomeRefereeController],
  providers: [RefereeService, RefereeDto],
  imports: [PrismaModule],
  exports: [RefereeService]
})
export class RefereeModule { }
