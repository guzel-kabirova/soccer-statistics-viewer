import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CompetitionModel, MatchModel, TeamModel } from '../models/app.model';


@Injectable({ providedIn: 'root' })
export class AppStoreService {
  private competitions: BehaviorSubject<CompetitionModel[]> = new BehaviorSubject<CompetitionModel[]>([]);
  public competitions$: Observable<CompetitionModel[]> = this.competitions.asObservable();

  private teams: BehaviorSubject<TeamModel[]> = new BehaviorSubject<TeamModel[]>([]);
  public teams$: Observable<TeamModel[]> = this.teams.asObservable();

  private matchesTeam: BehaviorSubject<MatchModel[]> = new BehaviorSubject<MatchModel[]>([]);
  public matchesTeam$: Observable<MatchModel[]> = this.matchesTeam.asObservable();

  private matchesComp: BehaviorSubject<MatchModel[]> = new BehaviorSubject<MatchModel[]>([]);
  public matchesComp$: Observable<MatchModel[]> = this.matchesComp.asObservable();

  private teamName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public teamName$: Observable<string> = this.teamName.asObservable();

  private competitionName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public competitionName$: Observable<string> = this.competitionName.asObservable();

  private competitionArea: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public competitionArea$: Observable<string> = this.competitionArea.asObservable();

  setCompetitionsData(competitions: CompetitionModel[]) {
    this.competitions.next(competitions);
  }

  setTeamsData(teams: TeamModel[]) {
    this.teams.next(teams);
  }

  setCurCompetitionMatches(matches: MatchModel[]) {
    this.matchesComp.next(matches);
  }

  setCurTeamMatches(matches: MatchModel[]) {
    this.matchesTeam.next(matches);
  }

  setCurTeamName(name: string) {
    this.teamName.next(name);
  }

  setCurCompetitionInfo(competitionName: string, competitionArea: string) {
    this.competitionName.next(competitionName);
    this.competitionArea.next(competitionArea);
  }
}
