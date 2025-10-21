import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdminFieldsController } from './controllers/admin.fields.controller';
import { HomeFieldsController } from './controllers/home.fields.controller';

@Module({
  controllers: [AdminFieldsController, HomeFieldsController],
  providers: [FieldsService],
  imports: [PrismaModule],
  exports: [FieldsService]
})
export class FieldsModule {}
