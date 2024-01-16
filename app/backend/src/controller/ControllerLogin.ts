import { Request, Response } from 'express';
import httpStatus from '../utils/htppStatus';
import ServiceLogin from '../services/ServiceLogin';

export default class ControllerLogin {
  constructor(private serviceLogin = new ServiceLogin()) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { statusCode, data } = await this.serviceLogin.login(email, password);
    res.status(httpStatus(statusCode)).json(data);
  }
}
