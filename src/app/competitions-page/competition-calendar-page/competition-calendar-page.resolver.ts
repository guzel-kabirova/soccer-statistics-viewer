import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AppApiService } from '../../shared/services/app.api.service';
import { PreloaderService } from '../../shared/components/preloader/preloader.service';
import { GetMatchesResponse } from '../../shared/dto';

@Injectable({providedIn: 'root'})
export class CompetitionCalendarPageResolver implements Resolve<Observable<GetMatchesResponse>>{

  constructor(
    private api: AppApiService,
    private preloaderService: PreloaderService,
    ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetMatchesResponse> {
    const id = route.params.id;
    return this.preloaderService.showPreloaderUntilComplete(this.api.getCurrentCompetition(id));
  }
}
