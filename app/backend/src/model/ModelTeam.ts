import ITeam from '../Interfaces/Team/ITeam';
import Team from '../database/models/Team';
import { ITModel } from '../Interfaces/Team/ITModel';

export default class ModelTeam implements ITModel {
  private model = Team;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findOne({ where: { id } });
    return team;
  }
}
