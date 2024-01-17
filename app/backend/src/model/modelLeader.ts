import Team from '../database/models/Team';
import Match from '../database/models/Matches';
import { ILeaderBoard } from '../Interfaces/leaderBoard/ILModel';
import ILeader from '../Interfaces/leaderBoard/ILeader';

type R = {
  winning: number,
  draw: number,
  defeat: number,
};

type G = {
  goalsScored: number,
  goalsConceded: number,
};

export default class ModelLeaderBoard implements ILeaderBoard {
  private team = Team;
  private match = Match;

  private async model() {
    const teams = await this.team.findAll();
    const matches = await this.match.findAll();
    return { teams, matches };
  }

  static MatchNumbers(matches: Match[]): R {
    const matchR = {
      winning: 0,
      draw: 0,
      defeat: 0,
    };

    matches.forEach((match) => {
      if (match.homeTeamGoals - match.awayTeamGoals >= 1) {
        matchR.winning += 1;
      }
      if (match.homeTeamGoals - match.awayTeamGoals <= -1) {
        matchR.defeat += 1;
      }
      if (match.homeTeamGoals - match.awayTeamGoals === 0) {
        matchR.draw += 1;
      }
    });
    return matchR;
  }

  static GoalsNumbers(matches: Match[]): G {
    const matchesR = {
      goalsScored: 0,
      goalsConceded: 0,
    };

    matches.forEach((match) => {
      matchesR.goalsScored += match.homeTeamGoals;
      matchesR.goalsConceded += match.awayTeamGoals;
    });
    return matchesR;
  }

  async homeTeams(): Promise<ILeader[]> {
    const { teams, matches } = await this.model();
    return teams.map((team) => {
      const teamR = matches.filter(((ma) => (ma.homeTeamId === team.id) && !ma.inProgress));
      const resultGa = ModelLeaderBoard.MatchNumbers(teamR);
      const resultGo = ModelLeaderBoard.GoalsNumbers(teamR);
      const eff = ((resultGa.winning * 3) + resultGa.draw) / (teamR.length * 3);
      return { name: team.teamName,
        totalPoints: (resultGa.winning * 3) + resultGa.draw,
        totalGames: teamR.length,
        totalVictories: resultGa.winning,
        totalDraws: resultGa.draw,
        totalLosses: resultGa.defeat,
        goalsFavor: resultGo.goalsScored,
        goalsOwn: resultGo.goalsConceded,
        goalsBalance: resultGo.goalsScored - resultGo.goalsConceded,
        efficiency: Number([eff]) * 100,
      };
    });
  }
}
