import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AppApiService } from '../../shared/services/app.api.service';
import { AppStoreService } from '../../shared/services/app.store.service';
import { MatchModel } from '../../shared/models/app.model';
import { MyFormData } from '../../app.interface';
import { PreloaderService } from '../../shared/components/preloader/preloader.service';

@Component({
  selector: 'app-competition-calendar-page',
  templateUrl: './competition-calendar-page.component.html',
  styleUrls: ['./competition-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionCalendarPageComponent implements OnInit, OnDestroy {
  displayedColumns = ['date', 'homeTeamName', 'awayTeamName', 'score'];

  competitionName$: Observable<string> = this.store.competitionName$;
  competitionArea$: Observable<string> = this.store.competitionArea$;
  matches!: MatchModel[];
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
    this.route.params
      .pipe(switchMap(params => {
        this.id = params.id;
        return this.preloaderService.showPreloaderUntilComplete(this.api.getCurrentCompetition(this.id));
      }))
      .subscribe();
    this.store.matchesComp$
      .pipe(
        tap(result => this.matches = result),
      )
      .subscribe();
  }

  startFilter(formData: MyFormData) {
    this.id &&
    this.preloaderService.showPreloaderUntilComplete(
      this.api.getCurrentCompetition(this.id, formData)
        .pipe(
          tap(() => this.router.navigate(
            ['/competitions', this.id],
            { queryParams: formData }),
          ),
        ),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.store.setCurCompetitionMatches([]);
    this.store.setCurCompetitionInfo('', '');
  }
}
