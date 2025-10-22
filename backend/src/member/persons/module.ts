import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PersonService } from './service';
import { AdminPersonController } from './ctrl.admin';
import { HomePersonController } from './ctrl.home';
import { PersonDto } from './dto';

@Module({
  controllers: [AdminPersonController, HomePersonController],
  providers: [PersonService, PersonDto],
  imports: [PrismaModule],
  exports: [PersonService]
})
export class PersonModule { }
