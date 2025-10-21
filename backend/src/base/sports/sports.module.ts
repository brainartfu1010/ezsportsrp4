import { Module } from '@nestjs/common';
import { SportsService } from './../sports/sports.service';
import { AdminSportsController } from './controllers/admin.sports.controller';
import { HomeSportsController } from './controllers/home.sports.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AdminSportsController, HomeSportsController],
  providers: [SportsService],
  imports: [PrismaModule],
  exports: [SportsService]
})
export class SportsModule {}
