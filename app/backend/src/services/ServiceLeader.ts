import ModelLeaderBoard from '../model/modelLeader';
import { Response } from '../Interfaces/Response';
import ILeader from '../Interfaces/leaderBoard/ILeader';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILModel';

export default class ServiceLeaderBoard {
  constructor(private modelLeaderBoard: ILeaderBoard = new ModelLeaderBoard()) {}

  static sortLeaderBoard(leaderBoard: ILeader[]) {
    leaderBoard.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) { return 1; }
      if (a.totalPoints === b.totalPoints) {
        if (a.goalsBalance < b.goalsBalance) { return 1; }
        if (a.goalsBalance === b.goalsBalance) {
          if (a.goalsFavor < b.goalsFavor) { return 1; }

          return -1;
        }
        return -1;
      }
      return -1;
    });
    return leaderBoard;
  }

  public async homeTeams(): Promise<Response<ILeader[]>> {
    const leaderBoard = await this.modelLeaderBoard.homeTeams();
    const leaderBoardSorted = ServiceLeaderBoard.sortLeaderBoard(leaderBoard);
    return { statusCode: 'SUCESSFULL', data: leaderBoardSorted };
  }

  public async leaderBoardAway(): Promise<Response<ILeader[]>> {
    const leaderBoard = await this.modelLeaderBoard.awayTeams();
    const leaderBoardSorted = ServiceLeaderBoard.sortLeaderBoard(leaderBoard);
    return { statusCode: 'SUCESSFULL', data: leaderBoardSorted };
  }
}
