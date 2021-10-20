import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/components/main-layout/main-layout.component';
import { CompetitionsPageComponent } from './competitions-page/competitions-page.component';
import { CompetitionCalendarPageComponent } from './competitions-page/competition-calendar-page/competition-calendar-page.component';
import { TeamsPageComponent } from './teams-page/teams-page.component';
import { TeamCalendarPageComponent } from './teams-page/team-calendar-page/team-calendar-page.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '',
        redirectTo: '/competitions',
        pathMatch: 'full',
      },
      {
        path: 'competitions',
        component: CompetitionsPageComponent,
      },
      {
        path: 'competitions/:id',
        component: CompetitionCalendarPageComponent,
      },
      {
        path: 'teams',
        component: TeamsPageComponent,
      },
      {
        path: 'teams/:id',
        component: TeamCalendarPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
