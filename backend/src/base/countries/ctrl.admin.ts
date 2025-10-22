import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CountriesService } from './service';
import { CountryDto } from './dto';

@Controller('admin/countries')
export class AdminCountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  create(@Body() countryDto: CountryDto) {
    return this.countriesService.create(countryDto);
  }

  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.countriesService.findAll(active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() countryDto: CountryDto) {
    return this.countriesService.update(+id, countryDto);
  }

  @Delete('bulk')
  removeMany(@Body() ids: number[]) {
    return this.countriesService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countriesService.remove(+id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: number]: number }[]) {
    return this.countriesService.reorder(orders);
  }
}
