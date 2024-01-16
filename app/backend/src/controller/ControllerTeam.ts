import { Request, Response } from 'express';
import httpStatus from '../utils/htppStatus';
import ServiceTeam from '../services/ServiceTeam';

export default class ControllerTeam {
  constructor(private serviceTeam = new ServiceTeam()) {}

  public async allTeams(_req: Request, res: Response) {
    const { statusCode, data } = await this.serviceTeam.findAll();
    res.status(httpStatus(statusCode)).json(data);
  }

  public async teamById(req: Request, res: Response) {
    const { id } = req.params;
    const { statusCode, data } = await this.serviceTeam.findById(Number(id));
    res.status(httpStatus(statusCode)).json(data);
  }
}
