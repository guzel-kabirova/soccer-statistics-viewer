import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import { AppApiService } from '../shared/services/app.api.service';
import { AppStoreService } from '../shared/services/app.store.service';
import { TeamModel } from '../shared/models/app.model';
import { PreloaderService } from '../shared/components/preloader/preloader.service';


@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsPageComponent implements OnInit {
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = [
    'teamName',
    'founded',
    'crestUrl',
    'area',
    'contacts',
  ];

  teams!: MatTableDataSource<TeamModel>;

  constructor(
    private api: AppApiService,
    private store: AppStoreService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private preloaderService: PreloaderService,
  ) {
  }

  ngOnInit() {
    this.preloaderService.showPreloaderUntilComplete(
      this.api.getTeams()
    ).subscribe();

    this.store.teams$
      .pipe(
        tap((result: TeamModel[]) => {
          this.teams = new MatTableDataSource(result);
          this.teams.sort = this.sort;
          this.cd.detectChanges();
        }),
      )
      .subscribe();
  }

  startSearch(searchStr: string) {
    this.teams.filter = searchStr.trim().toLowerCase();
  }

  openMore(row: any) {
    this.router.navigate(['/teams', `${row.id}`]);
  }
}
