import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team'
import { TeamList, teamMock } from './mocks/teams.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teams', () => {
  afterEach(sinon.restore);

  it('Pega todos os times', async () => {
    sinon.stub(Team, 'findAll').resolves(TeamList as any)
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(TeamList);
  });

  it('Pega um time pelo id', async () => {
    sinon.stub(Team, 'findOne').resolves(teamMock as any)
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(teamMock);
  }
  );
  
  it('Não encontra um time pelo id', async () => {
    sinon.stub(Team, 'findOne').resolves(null as any)
    const { status, body } = await chai.request(app).get('/teams/25');

    expect(status).to.be.eq(404);
    expect(body).to.be.deep.eq({ message: 'Team not found!' });
  }
  );
});