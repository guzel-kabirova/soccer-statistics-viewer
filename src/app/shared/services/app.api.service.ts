import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, tap } from 'rxjs/operators';
import { AppStoreService } from './app.store.service';
import { Observable } from 'rxjs';
import { GetCompetitionsResponse, GetMatchesResponse, GetTeamsResponse } from '../dto';
import { CompetitionModel, MatchModel, TeamModel } from '../models/app.model';
import { environment } from '../../../environments/environment';
import { MyFormData } from '../../app.interface';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AppApiService {
  constructor(
    private http: HttpClient,
    private store: AppStoreService,
  ) {
  }

  getCompetitions(): Observable<GetCompetitionsResponse> {
    this.store.toggleIsFetching();
    return this.http.get<GetCompetitionsResponse>(`${API_URL}competitions?plan=TIER_ONE`)
      .pipe(tap(res => {
        const competitions = res.competitions.map(competition => new CompetitionModel(competition))
        this.store.setCompetitionsData(competitions)
      }));
  }

  getCurrentCompetition(id: string, payload?: MyFormData): Observable<GetMatchesResponse> {
    this.store.toggleIsFetching();
    return this.http.get<GetMatchesResponse>(`${API_URL}competitions/${id}/matches${payload ? `?dateFrom=${payload.dateFrom}&dateTo=${payload.dateTo}` : ''}`)
      .pipe(tap(res => {
        const competitionName = res.competition.name;
        const competitionArea = res.competition.area.name;
        this.store.setCurCompetitionInfo(competitionName, competitionArea)
        const matches = res.matches.map(match => new MatchModel(match))
        this.store.setCurCompetitionMatches(matches)
      }));
  }

  getTeams(): Observable<GetTeamsResponse> {
    this.store.toggleIsFetching();
    return this.http.get<GetTeamsResponse>(`${API_URL}teams`)
      .pipe(tap(res => {
        const teams = res.teams.map(team => new TeamModel(team));
        this.store.setTeamsData(teams);
      }));
  }

  getCurrentTeam(id: string, payload?: MyFormData): Observable<GetMatchesResponse> {
    this.store.toggleIsFetching();
    return this.http.get<GetMatchesResponse>(`${API_URL}teams/${id}/matches${payload ? `?dateFrom=${payload.dateFrom}&dateTo=${payload.dateTo}` : ''}`)
      .pipe(tap(res => {
        this.http.get<{name: string}>(`${API_URL}teams/${id}`)
          .pipe(first(), tap(res => this.store.setCurTeamName(res.name)))
          .subscribe()
        const matches = res.matches.map(match => new MatchModel(match));
        this.store.setCurTeamMatches(matches);
      }));
  }
}
