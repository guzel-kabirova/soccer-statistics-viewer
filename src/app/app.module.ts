import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CompetitionsPageComponent } from './competitions-page/competitions-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { CompetitionCalendarPageComponent } from './competitions-page/competition-calendar-page/competition-calendar-page.component';
import { TeamCalendarPageComponent } from './teams-page/team-calendar-page/team-calendar-page.component';
import { FormsModule } from "@angular/forms";
import { InputComponent } from './shared/components/input/input.component';
import { TableComponent } from './shared/components/table/table.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { FilterComponent } from './shared/components/filter/filter.component';

@NgModule({
  declarations: [AppComponent, MainLayoutComponent, CompetitionsPageComponent, TeamsPageComponent, CompetitionCalendarPageComponent, TeamCalendarPageComponent, InputComponent, TableComponent, ButtonComponent, FilterComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
