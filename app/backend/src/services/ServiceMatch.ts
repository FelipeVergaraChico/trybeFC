import { Response, ResponseMessageType } from '../Interfaces/Response';
import IMatches from '../Interfaces/matches/IMatches';
import { IMModel, UpdateMatch, CreateMatch } from '../Interfaces/matches/IMModel';
import ModelMatches from '../model/ModelMatch';

export default class ServiceMatch {
  constructor(private modelMatch: IMModel = new ModelMatches()) {}
  public async findMatches(progress: string | undefined): Promise<Response<IMatches[]>> {
    if (progress !== undefined) {
      const matches = await this.modelMatch.matchByProgress(progress);
      return { statusCode: 'SUCESSFULL', data: matches };
    }
    const matches = await this.modelMatch.AllMatches();
    return { statusCode: 'SUCESSFULL', data: matches };
  }

  public async finishMatch(id: number): Promise<Response<ResponseMessageType>> {
    await this.modelMatch.updateProgressMatch(id);
    return { statusCode: 'SUCESSFULL', data: { message: 'finished!' } };
  }

  public async updateMatch(body: UpdateMatch, id: number): Promise<Response<ResponseMessageType>> {
    await this.modelMatch.updateGoals(body, id);
    return { statusCode: 'SUCESSFULL', data: { message: 'updated!' } };
  }

  private async verifyTeam(teamId: number[]) {
    const team = teamId.map(async (id) => {
      const teamFound = await this.modelMatch.findTeamById(id);
      return teamFound;
    });
    const teams = Promise.all(team);
    return teams;
  }

  private static teamEqual(firstTeam: number, secondTeam: number): boolean {
    if (firstTeam === secondTeam) return true;
    return false;
  }

  public async createMatch(body: CreateMatch): Promise<Response<IMatches>> {
    const { homeTeamId, awayTeamId } = body;
    const teams = [homeTeamId, awayTeamId];
    const e = ServiceMatch.teamEqual(Number(homeTeamId), Number(awayTeamId));
    if (e) {
      return {
        statusCode: 'INVALID_VALUE',
        data: {
          message: 'It is not possible to create a match with two equal teams' } };
    }
    const verifed = await this.verifyTeam(teams);
    if (!verifed[0] || !verifed[1]) {
      return { statusCode: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }

    const createdMatch = await this.modelMatch.createMatch(body);
    return { statusCode: 'CREATED', data: createdMatch };
  }
}
