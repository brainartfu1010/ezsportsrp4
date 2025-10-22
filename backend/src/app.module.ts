import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CountriesModule } from './base/countries/countries.module';
import { SportsModule } from './base/sports/sports.module';
import { FieldsModule } from './base/fields/fields.module';
import { TeamsModule } from './org/teams/teams.module';
import { EventTypeModule } from './sport/event-type/module';
import { ManagerTypeModule } from './sport/manager-type/module';
import { PlayerPositionModule } from './sport/player-position/module';
import { GamePeriodModule } from './sport/game-period/module';
import { ClubAdminModule } from './member/club-admins/module';
import { CoachModule } from './member/coaches/module';
import { ParentModule } from './member/parents/module';
import { TeamManagerModule } from './member/team-managers/module';
import { PersonModule } from './member/persons/module';
import { PlayerModule } from './member/players/module';
import { RefereeModule } from './member/referees/module';
import { SponsorModule } from './member/sponsors/module';

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
    SponsorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
