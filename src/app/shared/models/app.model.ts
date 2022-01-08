import { Match, Team, Competition, Season  } from '../dto';

export class TeamModel {
  id: number;
  teamName: string;
  founded: number;
  crestUrl: string;
  clubColors: string;
  area: string;
  contacts: {
    address: string
    website: string
    phone: string
    email: string | null
  };

  constructor(dto: Team) {
    this.id = dto.id;
    this.teamName = dto.name;
    this.founded = dto.founded;
    this.crestUrl = dto.crestUrl;
    this.clubColors = dto.clubColors;
    this.area = `${dto.venue}, ${dto.area.name}`;
    this.contacts = {
      address: dto.address,
      website: dto.website,
      phone: dto.phone,
      email: dto.email,
    };
  }
}

export class MatchModel {
  competitionName?: string;
  date: string;
  homeTeamName: string;
  awayTeamName: string;
  score: string;
  constructor(dto: Match) {
    this.competitionName = dto.competition && dto.competition.name;
    this.date = new Intl.DateTimeFormat( 'ru', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short'
    }).format(new Date(dto.utcDate));
    this.homeTeamName = dto.homeTeam.name;
    this.awayTeamName = dto.awayTeam.name;
    this.score = `${dto.score.fullTime.homeTeam ?? 0} : ${dto.score.fullTime.awayTeam ?? 0}`
  }
}

export class SeasonModel {
  start: Date;
  end: Date;
  matchDays: string;
  winnerName: string;

  constructor(dto: Season) {
    this.start = new Date(dto.startDate);
    this.end = new Date(dto.endDate);
    this.matchDays = dto.currentMatchday?.toString() || '-';
    this.winnerName = dto.winner?.name ?? '-';
  }
}

export class CompetitionModel {
  id: number;
  name: string;
  areaName: string;
  currentSeasonInterval: string;
  matchDays: string;
  winnerName: string

  constructor(dto: Competition) {
    const currentSeason = new SeasonModel(dto.currentSeason);

    this.id = dto.id;
    this.name = dto.name;
    this.areaName = dto.area.name;
    this.currentSeasonInterval = `${new Intl.DateTimeFormat('ru').format(currentSeason.start)}
    - ${new Intl.DateTimeFormat('ru').format(currentSeason.end)}`;
    this.matchDays = new SeasonModel(dto.currentSeason).matchDays;
    this.winnerName = new SeasonModel(dto.currentSeason).winnerName;
  }
}


