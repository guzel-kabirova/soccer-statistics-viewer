import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AppApiService } from '../../shared/services/app.api.service';
import { AppStoreService } from '../../shared/services/app.store.service';
import { MatchModel } from '../../shared/models/app.model';
import { MyFormData } from '../../app.interface';
import { PreloaderService } from '../../shared/components/preloader/preloader.service';

@Component({
  selector: 'app-team-calendar-page',
  templateUrl: './team-calendar-page.component.html',
  styleUrls: ['./team-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamCalendarPageComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'competitionName',
    'date',
    'homeTeamName',
    'awayTeamName',
    'score',
  ];

  matches!: MatchModel[];
  teamName$: Observable<string> = this.store.teamName$;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private api: AppApiService,
    private store: AppStoreService,
    private router: Router,
    private preloaderService: PreloaderService,
  ) {
  }

  ngOnInit() {
    // this.route.params
    //   .pipe(switchMap(params => {
    //     this.id = params.id;
    //     return this.preloaderService.showPreloaderUntilComplete(this.api.getCurrentTeam(this.id));
    //   }))
    //   .subscribe();
    this.store.matchesTeam$
      .pipe(
        tap(result => this.matches = result),
      )
      .subscribe();
  }

  startFilter(formData: MyFormData) {
    this.id &&
    this.preloaderService
      .showPreloaderUntilComplete(this.api.getCurrentTeam(this.id, formData)
        .pipe(
          tap(
            () => {
              this.router.navigate(['/teams', this.id], { queryParams: formData });
            },
          ),
        )).subscribe();
  }

  ngOnDestroy(): void {
    this.store.setCurTeamMatches([]);
    this.store.setCurTeamName('');
  }
}
