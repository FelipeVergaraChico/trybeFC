import { Request, Response } from 'express';
import httpStatus from '../utils/htppStatus';
import ServiceMatch from '../services/ServiceMatch';

export default class ControllerMatch {
  constructor(private serviceMatch = new ServiceMatch()) {}

  public async allMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const progress = typeof inProgress === 'string' ? inProgress : undefined;
    const { statusCode, data } = await this.serviceMatch.findMatches(progress);
    res.status(httpStatus(statusCode)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { statusCode, data } = await this.serviceMatch.finishMatch(Number(id));
    res.status(httpStatus(statusCode)).json(data);
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { statusCode, data } = await this.serviceMatch.updateMatch({
      homeTeamGoals, awayTeamGoals,
    }, Number(id));
    res.status(httpStatus(statusCode)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const { body } = req;
    const { statusCode, data } = await this.serviceMatch.createMatch(body);
    res.status(httpStatus(statusCode)).json(data);
  }
}
