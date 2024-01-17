import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import {
    EmailInvalid,
    InvalidPassword,
    InvalidPasswordL,
    login,
    SemEmail,
    SemPassword,
    loginModel,
    mensagemInvalida,
    mensagemMiddleware
} from './mocks/logins.mock'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste Login', () => {
  afterEach(sinon.restore);

  it('Consegue fazer login', async () => {
   const loginReturn = User.build(loginModel)
   sinon.stub(User, 'findOne').resolves(loginReturn)
   const { status, body } = await chai.request(app).post('/login').send(login);
   expect(status).to.be.eq(200);
    expect(body).string;
  });
  it('Não consegue fazer login com email inválido', async () => {
    sinon.stub(User, 'findOne').resolves(null)
    const { status, body } = await chai.request(app).post('/login').send(EmailInvalid);
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq(mensagemInvalida);
  });
  it('Não consegue fazer login com senha inválida', async () => {
    const { status, body } = await chai.request(app).post('/login').send(InvalidPasswordL);
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq(mensagemInvalida);
  });
  it('Não consegue fazer login com senha inválida login', async () => {
    const loginReturn = User.build(loginModel)
    sinon.stub(User, 'findOne').resolves(loginReturn)
    const { status, body } = await chai.request(app).post('/login').send(InvalidPassword);
    expect(status).to.be.eq(401);
    expect(body).to.be.deep.eq(mensagemInvalida);
});
it('Não consegue fazer login sem email', async () => {
    const { status, body } = await chai.request(app).post('/login').send(SemEmail);
    expect(status).to.be.eq(400);
    expect(body).to.be.deep.eq(mensagemMiddleware);
});
it('Não consegue fazer login sem senha', async () => {
    const { status, body } = await chai.request(app).post('/login').send(SemPassword);
    expect(status).to.be.eq(400);
    expect(body).to.be.deep.eq(mensagemMiddleware);
});
});
