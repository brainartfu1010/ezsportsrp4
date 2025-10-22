import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { TeamManagerService } from './service';
import { AdminTeamManagerController } from './ctrl.admin';
import { HomeTeamManagerController } from './ctrl.home';
import { TeamManagerDto } from './dto';

@Module({
  controllers: [AdminTeamManagerController, HomeTeamManagerController],
  providers: [TeamManagerService, TeamManagerDto],
  imports: [PrismaModule],
  exports: [TeamManagerService]
})
export class TeamManagerModule { }
