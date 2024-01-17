import { Response, Request } from 'express';
import httpStatus from '../utils/htppStatus';
import ServiceLeaderBoard from '../services/ServiceLeader';

export default class ControllerLeaderBoard {
  constructor(private serviceLeaderBoard: ServiceLeaderBoard = new ServiceLeaderBoard()) {}

  public async leaderBoard(_req: Request, res: Response) {
    const { statusCode, data } = await this.serviceLeaderBoard.homeTeams();
    res.status(httpStatus(statusCode)).json(data);
  }

  public async leaderBoardAway(_req: Request, res: Response) {
    const { statusCode, data } = await this.serviceLeaderBoard.leaderBoardAway();
    res.status(httpStatus(statusCode)).json(data);
  }
}
