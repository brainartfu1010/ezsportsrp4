import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClubsService } from './service';
import { OrgClubDto } from './dto';

@Controller('admin/clubs')
export class AdminClubsController {
  constructor(private readonly clubsService: ClubsService) { }

  @Post()
  create(@Body() clubDto: OrgClubDto) {
    return this.clubsService.create(clubDto);
  }

  @Get()
  findAll(
    @Query('active') active?: boolean,
    @Query('skip') skip?: number,
    @Query('take') take?: number
  ) {
    return this.clubsService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clubsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() clubDto: OrgClubDto
  ) {
    return this.clubsService.update(id, clubDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clubsService.remove(id);
  }
}
