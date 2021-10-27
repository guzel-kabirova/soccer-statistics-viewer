export interface GetCompetitionsResponse {
  competitions: Competition[];
}

export interface Competition {
  id: number,
  area: {
    name: string,
  },
  name: string,
  currentSeason: Season,
  seasons: Season[]
}

export interface GetTeamsResponse {
  teams: Team[];
}

export interface Team {
  address: string,
  area: {
    name: string
  },
  clubColors: string,
  crestUrl: string,
  email: string | null,
  founded: number,
  id: number,
  name: string,
  phone: string,
  shortName: string,
  tla: string,
  venue: string,
  website: string
}

export interface Season {
  startDate: string,
  endDate: string,
  currentMatchday: number,
  winner: {
    name: string
  }
}

export interface GetMatchesResponse {
  competition: {
    area: {
      name: string
    }
    name: string
  };
  matches: Match[];
}

export interface Match {
  id: number,
  competition?: {
    name: string
  },
  utcDate: string,
  homeTeam: {
    name: string
  },
  awayTeam: {
    name: string
  },
  score: {
    fullTime: {
      homeTeam: number,
      awayTeam: number
    }
  }
}
