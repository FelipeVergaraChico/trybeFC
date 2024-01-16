import ITeam from './ITeam';

export interface ITModel {
  findAll(): Promise<ITeam[]>;
  findById(id: number): Promise<ITeam | null>;
}
