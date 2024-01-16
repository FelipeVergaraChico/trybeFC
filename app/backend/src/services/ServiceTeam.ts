import ModelTeam from '../model/ModelTeam';
import { Response } from '../Interfaces/Response';
import ITeam from '../Interfaces/Team/ITeam';
import { ITModel } from '../Interfaces/Team/ITModel';

export default class ServiceTeam {
  constructor(private teamModel: ITModel = new ModelTeam()) {}

  public async findAll(): Promise<Response<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { statusCode: 'SUCESSFULL', data: teams };
  }

  public async findById(id: number): Promise<Response<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) return { statusCode: 'NOT_FOUND', data: { message: 'Team not found!' } };
    return { statusCode: 'SUCESSFULL', data: team };
  }
}
