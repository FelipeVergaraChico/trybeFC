import IMatches from './IMatches';
import ITeam from '../Team/ITeam';

export interface IMModel {
  AllMatches(): Promise<IMatches[]>;
  matchByProgress(progress: string | undefined): Promise<IMatches[]>;
  updateProgressMatch(id: number): Promise<void>;
  updateGoals(body: UpdateMatch, id: number): Promise<void>;
  createMatch(body: CreateMatch): Promise<IMatches>;
  findTeamById(id: number): Promise<ITeam | null>;
}

export type UpdateMatch = {
  homeTeamGoals: number;
  awayTeamGoals: number;
};

export type CreateMatch = {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
};
