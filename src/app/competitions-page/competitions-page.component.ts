import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AppApiService } from '../shared/services/app.api.service';
import { Observable } from 'rxjs';
import { AppStoreService } from '../shared/services/app.store.service';
import { CompetitionModel } from '../shared/models/app.model';

@Component({
  selector: 'app-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: ['./competitions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionsPageComponent implements OnInit {
  thead = [
    { name: 'Название', width: '20%' },
    { name: 'Локация', width: '20%' },
    { name: 'Текущий сезон', width: '28%' },
    { name: 'Кол-во дней', width: '12%' },
    { name: 'Победитель', width: '20%' },
  ];

  competitions$: Observable<CompetitionModel[]> = this.store.competitions$;
  searchStr = '';

  constructor(private store: AppStoreService,
              private api: AppApiService) {
  }

  ngOnInit() {
    this.api.getCompetitions()
      .subscribe(() => this.store.toggleIsFetching());
  }

  startSearch(searchStr: string) {
    this.searchStr = searchStr;
  }
}
