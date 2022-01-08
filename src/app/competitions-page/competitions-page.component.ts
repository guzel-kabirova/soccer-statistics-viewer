import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';

import { AppApiService } from '../shared/services/app.api.service';
import { AppStoreService } from '../shared/services/app.store.service';
import { CompetitionModel } from '../shared/models/app.model';
import { PreloaderService } from '../shared/components/preloader/preloader.service';


@Component({
  selector: 'app-competitions-page',
  templateUrl: './competitions-page.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetitionsPageComponent implements OnInit {
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = [
    'name',
    'areaName',
    'currentSeasonInterval',
    'matchDays',
    'winnerName',
  ];

  competitions!: MatTableDataSource<CompetitionModel>;

  constructor(
    private store: AppStoreService,
    private api: AppApiService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private preloaderService: PreloaderService,
  ) {
  }

  ngOnInit() {
    this.preloaderService
      .showPreloaderUntilComplete(this.api.getCompetitions())
      .subscribe();
    this.store.competitions$
      .pipe(
        tap(
          (result: CompetitionModel[]) => {
            this.competitions = new MatTableDataSource(result);
            this.competitions.sort = this.sort;
            this.cd.detectChanges();
          },
        ),
      )
      .subscribe();
  }

  startSearch(searchStr: string) {
    this.competitions.filter = searchStr.trim().toLowerCase();
  }

  openMore(row: any) {
    this.router.navigate(['/competitions', `${row.id}`]);
  }
}
