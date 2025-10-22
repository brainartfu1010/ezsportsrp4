import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerService } from './service';
import { AdminPlayerController } from './ctrl.admin';
import { HomePlayerController } from './ctrl.home';
import { PlayerDto } from './dto';

@Module({
  controllers: [AdminPlayerController, HomePlayerController],
  providers: [PlayerService, PlayerDto],
  imports: [PrismaModule],
  exports: [PlayerService]
})
export class PlayerModule { }
