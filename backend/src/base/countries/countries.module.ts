import { Module } from '@nestjs/common';
import { AdminCountriesService } from './../countries/countries.service';
import { AdminCountriesController } from './controllers/admin.countries.controller';
import { HomeCountriesController } from './controllers/home.countries.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AdminCountriesController, HomeCountriesController],
  providers: [AdminCountriesService],
  imports: [PrismaModule],
  exports: [AdminCountriesService]
})
export class CountriesModule {}
