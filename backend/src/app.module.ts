import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CountriesModule } from './base/countries/module';
import { SportsModule } from './base/sports/module';
import { FieldsModule } from './base/fields/module';
import { TeamsModule } from './org/teams/module';
import { EventTypeModule } from './sport/event-types/module';
import { ManagerTypeModule } from './sport/manager-types/module';
import { PlayerPositionModule } from './sport/player-positions/module';
import { GamePeriodModule } from './sport/game-periods/module';
import { ClubAdminModule } from './member/club-admins/module';
import { CoachModule } from './member/coaches/module';
import { ParentModule } from './member/parents/module';
import { TeamManagerModule } from './member/team-managers/module';
import { PersonModule } from './member/persons/module';
import { PlayerModule } from './member/players/module';
import { RefereeModule } from './member/referees/module';
import { SponsorModule } from './member/sponsors/module';
import { ClubsModule } from './org/clubs/module';
import { LeaguesModule } from './org/leagues/module';
import { GroupLevelsModule } from './base/group-levels/module';
import { PlanGamesModule } from './plan/games/module';
import { PlanMeetingsModule } from './plan/meetings/module';
import { PlanTrainingsModule } from './plan/trainings/module';

@Module({
  imports: [
    PrismaModule,
    SportsModule,
    CountriesModule,
    FieldsModule,
    TeamsModule,
    EventTypeModule,
    ManagerTypeModule,
    PlayerPositionModule,
    GamePeriodModule,
    ClubAdminModule,
    CoachModule,
    ParentModule,
    TeamManagerModule,
    PersonModule,
    PlayerModule,
    RefereeModule,
    SponsorModule,
    ClubsModule,
    LeaguesModule,
    GroupLevelsModule,
    PlanGamesModule,
    PlanMeetingsModule,
    PlanTrainingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
