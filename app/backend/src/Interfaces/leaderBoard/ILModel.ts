import ILeader from './ILeader';

export interface ILeaderBoard {
  homeTeams(): Promise<ILeader[]>;
}
