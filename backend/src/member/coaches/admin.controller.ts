import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CoachService } from './service';
import { CoachDto } from './dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('admin/coaches')
export class AdminCoachController {
  constructor(private readonly coachService: CoachService) { }

  @Post()
  create(@Body() createCoachDto: CoachDto) {
    return this.coachService.create(createCoachDto);
  }

  @Get()
  @ApiQuery({ name: 'status', required: false })
  findAll(@Query('status') status?: string) {
    return this.coachService.findAll(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: CoachDto) {
    return this.coachService.update(id, updateCoachDto);
  }

  @Delete('bulk')
  removeBulk(@Body() ids: string[]) {
    console.log("Remove Bulk:", ids);
    return this.coachService.removeMany(ids);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    console.log("Remove:", id);
    return this.coachService.remove(id);
  }

  @Post('reorder')
  reorder(@Body() orders: { [key: string]: number }[]) {
    return this.coachService.reorder(orders);
  }
}
