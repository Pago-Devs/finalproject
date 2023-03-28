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

let idResposta;
describe('GET em /v1/clients/verify', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('GET em /v1/clients/:id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get(`/v1/clients/${idResposta}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});
