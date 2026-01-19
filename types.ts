
export interface Player {
  id: string;
  name: string;
  position: 'GK' | 'DEF' | 'MID' | 'FWD';
  rating: number;
  number: number;
}

export interface Coach {
  name: string;
  tacticalStyle: string;
}

export interface Team {
  id: string;
  name: string;
  league: string;
  country: string;
  players: Player[];
  coach: Coach;
  logo: string;
}

export interface Stadium {
  id: string;
  name: string;
  capacity: string;
  lighting: 'day' | 'night' | 'sunset';
  weather: 'sunny' | 'rainy' | 'cloudy';
}

export type GameState = 'MENU' | 'MATCHMAKING' | 'PLAYING' | 'STATS' | 'REWARDS';

export interface MatchEvent {
  minute: number;
  type: 'goal' | 'card' | 'shot' | 'commentary';
  text: string;
  player?: string;
}
