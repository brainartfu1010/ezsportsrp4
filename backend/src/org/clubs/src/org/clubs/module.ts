import { Module } from '@nestjs/common';
import { TeamsService } from './service';
import { TeamsController } from './ctrl.admin';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  // controllers: [TeamsController],
  // providers: [TeamsService],
  // exports: [TeamsService]
})
export class TeamsModule {}
