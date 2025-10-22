import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ClubAdminService } from './service';
import { AdminClubAdminController } from './ctrl.admin';
import { HomeClubAdminController } from './ctrl.home';
import { ClubAdminDto } from './dto';

@Module({
  controllers: [AdminClubAdminController, HomeClubAdminController],
  providers: [ClubAdminService, ClubAdminDto],
  imports: [PrismaModule],
  exports: [ClubAdminService]
})
export class ClubAdminModule { }
