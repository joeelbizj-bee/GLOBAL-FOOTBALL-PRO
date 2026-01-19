
import { Team, Stadium } from './types';

export const TEAMS: Team[] = [
  {
    id: 'rma',
    name: 'Real Madrid',
    league: 'La Liga',
    country: 'Spain',
    logo: 'https://picsum.photos/seed/rma/100/100',
    coach: { name: 'Carlo Ancelotti', tacticalStyle: 'Counter-Attack' },
    players: [
      { id: 'vjr', name: 'Vinícius Júnior', position: 'FWD', rating: 91, number: 7 },
      { id: 'mbp', name: 'Kylian Mbappé', position: 'FWD', rating: 92, number: 9 },
      { id: 'jbl', name: 'Jude Bellingham', position: 'MID', rating: 90, number: 5 }
    ]
  },
  {
    id: 'mci',
    name: 'Manchester City',
    league: 'Premier League',
    country: 'England',
    logo: 'https://picsum.photos/seed/mci/100/100',
    coach: { name: 'Pep Guardiola', tacticalStyle: 'Possession' },
    players: [
      { id: 'ehl', name: 'Erling Haaland', position: 'FWD', rating: 91, number: 9 },
      { id: 'kdb', name: 'Kevin De Bruyne', position: 'MID', rating: 91, number: 17 },
      { id: 'rod', name: 'Rodri', position: 'MID', rating: 90, number: 16 }
    ]
  },
  {
    id: 'ars',
    name: 'Arsenal',
    league: 'Premier League',
    country: 'England',
    logo: 'https://picsum.photos/seed/ars/100/100',
    coach: { name: 'Mikel Arteta', tacticalStyle: 'High Press' },
    players: [
      { id: 'bsk', name: 'Bukayo Saka', position: 'FWD', rating: 88, number: 7 },
      { id: 'mod', name: 'Martin Ødegaard', position: 'MID', rating: 89, number: 8 }
    ]
  }
];

export const STADIUMS: Stadium[] = [
  { id: 'sba', name: 'Santiago Bernabéu', capacity: '81,000', lighting: 'night', weather: 'sunny' },
  { id: 'eti', name: 'Etihad Stadium', capacity: '53,000', lighting: 'day', weather: 'rainy' },
  { id: 'emr', name: 'Emirates Stadium', capacity: '60,000', lighting: 'sunset', weather: 'cloudy' }
];
