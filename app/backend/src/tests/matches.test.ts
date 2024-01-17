import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/Matches';
import { MatchesMock, matchesTrue, matchesFalse } from './mocks/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  afterEach(sinon.restore);

  it('Mostra todas as partidas', async () => {
    sinon.stub(Match, 'findAll').resolves(MatchesMock as any);
    const { status, body } = await chai.request(app).get('/matches');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(MatchesMock);
  });
  it('Mostra todas as partidas em andamento', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesTrue as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matchesTrue);
  });
  it('Mostra todas as partidas que não estão em andamento', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesFalse as any);
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');
    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(matchesFalse);
  });
});