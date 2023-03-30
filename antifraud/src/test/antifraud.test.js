/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import mongoose from 'mongoose';
import request from 'supertest';
import {
  beforeAll, afterAll, describe, it,
} from '@jest/globals';
import app from '../../index.js';

beforeAll(async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://admin:secret@mongodb:27017/pagodevs-antifraud?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET em /v1/analysis', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/v1/analysis')
      .expect(200);
  });
});

describe('GET em /v1/analysis/dataclient/:id', () => {
  it('Deve retornar recurso selecionado', async () => {
    await request(app)
      .get('/v1/analysis/dataclient/64230eba9bc0552f98d8f374')
      .expect(200);
  });

  it('Deve retornar erro ao passar dados inválidos', async () => {
    await request(app)
      .get('/v1/analysis/dataclient/111111')
      .expect(404);
  });
});

// describe('POST em /v1/analysis/', () => {
//   it('Deve adicionar uma nova verificação de antifraude', async () => {
//     await request(app)
//       .post('/v1/analysis/')
//       .send({
//         transactionId: '6425a78893e00f341fda4de2',
//         clientId: '64230eba9bc0552f98d8f374',
//       })
//       .expect(201);
//   });

//   describe('PATCH em /v1/analysis/updatestatus', () => {
//     it('Deve atualizar o status', async () => {
//       await request(app)
//         .patch('/v1/analysis/updatestatus/')
//         .send({
//           clientId: '64230eba9bc0552f98d8f374',
//           status: 'Aprovada',
//         })
//         .expect(201);
//     });
//   });
// });
