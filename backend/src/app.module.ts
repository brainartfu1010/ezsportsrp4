import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CountriesModule } from './base/countries/countries.module';
import { SportsModule } from './base/sports/sports.module';
import { FieldsModule } from './base/fields/fields.module';

@Module({
  imports: [
    PrismaModule, 
    SportsModule, 
    CountriesModule,
    FieldsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
