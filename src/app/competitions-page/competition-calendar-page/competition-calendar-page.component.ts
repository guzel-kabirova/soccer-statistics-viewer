import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AppApiService } from '../../shared/services/app.api.service';
import { AppStoreService } from '../../shared/services/app.store.service';
import { Observable } from 'rxjs';
import { MatchModel } from '../../shared/models/app.model';
import { MyFormData } from '../../app.interface';

@Component({
  selector: 'app-competition-calendar-page',
  templateUrl: './competition-calendar-page.component.html',
  styleUrls: ['./competition-calendar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionCalendarPageComponent implements OnInit, OnDestroy {
  thead = [
    { name: 'Дата матча', width: '30%' },
    { name: 'Дом', width: '25%' },
    { name: 'Гость', width: '25%' },
    { name: 'Счет', width: '20%' },
  ];

  competitionName$: Observable<string> = this.store.competitionName$;
  competitionArea$: Observable<string> = this.store.competitionArea$;
  matches$: Observable<MatchModel[]> = this.store.matchesComp$;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private api: AppApiService,
    private store: AppStoreService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.params
      .pipe(switchMap(params => {
        this.id = params.id;
        return this.api.getCurrentCompetition(this.id);
      }))
      .subscribe(() => this.store.toggleIsFetching());
  }

  startFilter(formData: MyFormData) {
    this.id &&
    this.api.getCurrentCompetition(this.id, formData)
      .subscribe(() => {
          this.router.navigate(['/competitions', this.id], { queryParams: formData });
          this.store.toggleIsFetching();
        },
      );
  }


  ngOnDestroy(): void {
    this.store.setCurCompetitionMatches([]);
    this.store.setCurCompetitionInfo('', '');
  }
}
