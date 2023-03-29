/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import mongoose from 'mongoose';
import request from 'supertest';
import {
  describe, it,
} from '@jest/globals';
import app from '../app.js';

beforeAll(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Testando routes', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/')
      .send({
        titulo: 'Projeto Final',
      })
      .expect(200);
  });
});

describe('GET em /v1/clients/verify', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        name: 'Olnar T Silva',
        numberCard: '5537464499559077',
        expirationDate: '27/02/2024',
        cvv: '554',
      })
      .expect(200);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        name: 'Olnar T Silva',
        numberCard: '5537464499559077',
        expirationDate: '27/02/2024',
        cvv: '111',
      })
      .expect(400);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        name: 'Olnar T Silva',
        numberCard: '5537464499559077',
        expirationDate: '27/02/2030',
        cvv: '554',
      })
      .expect(400);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        name: 'Olnar',
        numberCard: '5537464499559077',
        expirationDate: '27/02/2024',
        cvv: '554',
      })
      .expect(400);
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .post('/v1/clients/verify')
      .send({})
      .expect(404);
  });
});

describe('GET em /v1/clients/:id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/v1/clients/6422dbf3a320cb145d974f2d')
      .expect(200);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .post('/v1/clients/111111')
      .expect(404);
  });
});
