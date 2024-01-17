import IMatches from '../Interfaces/matches/IMatches';
import ITeam from '../Interfaces/Team/ITeam';
import Matches from '../database/models/Matches';
import { IMModel, UpdateMatch, CreateMatch } from '../Interfaces/matches/IMModel';
import Team from '../database/models/Team';

export default class ModelMatches implements IMModel {
  private model = Matches;
  private team = Team;
  includes = [
    {
      model: Team,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: Team,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ];

  async AllMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({ include: this.includes });
    return matches;
  }

  async matchByProgress(progress: string | undefined): Promise<IMatches[]> {
    const going = progress === 'true';
    const matches = await this.model.findAll({
      where: { inProgress: going },
      include: this.includes,
    });
    return matches;
  }

  async updateProgressMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: true }, { where: { id } });
  }

  async updateGoals(body: UpdateMatch, id: number): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = body;
    await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async createMatch(body: CreateMatch): Promise<IMatches> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = body;
    const match = await this.model.create({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
      inProgress: true,
    });
    return match.dataValues;
  }

  async findTeamById(id: number): Promise<ITeam | null> {
    const teamId = await this.team.findOne({ where: { id } });
    return teamId;
  }
}
