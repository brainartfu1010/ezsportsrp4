import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { SponsorService } from './service';
import { AdminSponsorController } from './ctrl.admin';
import { HomeSponsorController } from './ctrl.home';
import { SponsorDto } from './dto';

@Module({
  controllers: [AdminSponsorController, HomeSponsorController],
  providers: [SponsorService, SponsorDto],
  imports: [PrismaModule],
  exports: [SponsorService]
})
export class SponsorModule { }
