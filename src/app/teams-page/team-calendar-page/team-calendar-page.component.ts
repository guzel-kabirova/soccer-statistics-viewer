import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AppApiService } from '../../shared/services/app.api.service';
import { AppStoreService } from '../../shared/services/app.store.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatchModel } from '../../shared/models/app.model';
import { MyFormData } from '../../app.interface';

@Component({
  selector: 'app-team-calendar-page',
  templateUrl: './team-calendar-page.component.html',
  styleUrls: ['./team-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamCalendarPageComponent implements OnInit, OnDestroy {
  thead = [
    { name: 'Соревнование', width: '26%' },
    { name: 'Дата матча', width: '26%' },
    { name: 'Дом', width: '18%' },
    { name: 'Гость', width: '18%' },
    { name: 'Счет', width: '12%' },
  ];

  matches$: Observable<MatchModel[]> = this.store.matchesTeam$;
  teamName$: Observable<string> = this.store.teamName$;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private api: AppApiService,
    private store: AppStoreService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(params => {
        this.id = params.id;
        return this.api.getCurrentTeam(this.id)
      }))
      .subscribe(() => this.store.toggleIsFetching());
  }

  startFilter(formData: MyFormData) {
    this.id &&
    this.api.getCurrentTeam(this.id, formData)
      .subscribe(() => {
          this.router.navigate(['/teams', this.id], { queryParams: formData });
          this.store.toggleIsFetching();
        },
      );
  }

  ngOnDestroy(): void {
    this.store.setCurTeamMatches([]);
    this.store.setCurTeamName('');
  }
}
