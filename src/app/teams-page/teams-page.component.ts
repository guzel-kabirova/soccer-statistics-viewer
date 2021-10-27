import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppApiService } from '../shared/services/app.api.service';
import { AppStoreService } from '../shared/services/app.store.service';
import { Observable } from 'rxjs';
import { TeamModel } from '../shared/models/app.model';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsPageComponent implements OnInit {
  thead = [
    { name: 'Название', width: '20%' },
    { name: 'Год основания', width: '12%' },
    { name: 'Эмблема', width: '20%' },
    { name: 'Место тренировок', width: '20%' },
    { name: 'Контакты', width: '30%' },
  ];

  teams$: Observable<TeamModel[]> = this.store.teams$;

  constructor(
    private api: AppApiService,
    private store: AppStoreService,
  ) {
  }

  ngOnInit() {
    this.api.getTeams()
      .subscribe(() => this.store.toggleIsFetching());
  }

  startSearch(teamName: string) {

  }
}
