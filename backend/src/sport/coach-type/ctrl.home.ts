import { Controller, Get, Param, Query } from '@nestjs/common';
import { CoachTypeService } from './service';

@Controller('coach-types')
export class HomeCoachTypeController {
  constructor(private readonly coachTypeService: CoachTypeService) { }


  @Get()
  findAll(@Query('active') active?: boolean) {
    return this.coachTypeService.findAll(active);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachTypeService.findOne(id);
  }

}
