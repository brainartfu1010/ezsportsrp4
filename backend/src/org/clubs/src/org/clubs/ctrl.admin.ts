import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TeamsService } from './service';
import { CreateTeamDto } from './dto';

// @Controller('teams')
// @UseGuards(JwtAuthGuard, RolesGuard)
// export class TeamsController {
//   constructor(private readonly teamsService: TeamsService) {}

//   @Post()
//   @Roles(Role.ADMIN, Role.TEAM_MANAGER, Role.COACH)
//   create(@Body() createTeamDto: CreateTeamDto) {
//     return this.teamsService.create(createTeamDto);
//   }

//   @Get()
//   @Roles(Role.ADMIN, Role.TEAM_MANAGER, Role.COACH)
//   findAll(
//     @Query('skip') skip?: number,
//     @Query('take') take?: number,
//     @Query('clubId') clubId?: string,
//     @Query('sportId') sportId?: string
//   ) {
//     return this.teamsService.findAll({
//       skip: skip ? Number(skip) : undefined,
//       take: take ? Number(take) : undefined,
//       where: {
//         clubId,
//         sportId
//       }
//     });
//   }

//   @Get(':id')
//   @Roles(Role.ADMIN, Role.TEAM_MANAGER, Role.COACH)
//   findOne(@Param('id') id: string) {
//     return this.teamsService.findOne(id);
//   }

//   @Patch(':id')
//   @Roles(Role.ADMIN, Role.TEAM_MANAGER, Role.COACH)
//   update(
//     @Param('id') id: string, 
//     @Body() updateTeamDto: UpdateTeamDto
//   ) {
//     return this.teamsService.update(id, updateTeamDto);
//   }

//   @Delete(':id')
//   @Roles(Role.ADMIN, Role.TEAM_MANAGER)
//   remove(@Param('id') id: string) {
//     return this.teamsService.remove(id);
//   }
// }
