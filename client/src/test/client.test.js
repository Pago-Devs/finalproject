import mongoose from 'mongoose';
import request from 'supertest';
import {
  beforeAll, afterAll, describe, it,
} from '@jest/globals';
import app from '../app.js';

beforeAll(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST em /v1/clients/verify', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .post('/v1/clients/verify')
      .send({
        cardData: {
          name: 'Olnar T Silva',
          numberCard: '5537464499559077',
          expirationDate: '2024-02',
          cvc: '554',
        },
      })
      .expect(200);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        cardData: {
          name: 'Olnar T Silva',
          numberCard: '5537464499559077',
          expirationDate: '2024-02',
          cvc: '111',
        },
      })
      .expect(404);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        cardData: {
          name: 'Olnar T Silva',
          numberCard: '5537464499559077',
          expirationDate: '2030-02',
          cvc: '554',
        },
      })
      .expect(404);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({
        cardData: {
          name: 'Olnar',
          numberCard: '5537464499559077',
          expirationDate: '2024-02',
          cvc: '554',
        },
      })
      .expect(404);
  });
  it('Deve nao adicionar nada ao passar o body vazio', async () => {
    await request(app)
      .get('/v1/clients/verify')
      .send({})
      .expect(404);
  });
});

describe('GET em /v1/clients/:id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/v1/clients/64230eba9bc0552f98d8f373')
      .expect(200);
  });
  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/clients/111111')
      .expect(404);
  });
});
