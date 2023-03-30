/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
import { describe, it, jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../app.js';

afterAll((done) => {
  mongoose.connection.close();
  done();
});

let idResult;
const invalidId = '64020888cd8abb571043a58k';

describe('POST on /v1/transaction', () => {
  it('Must create a transaction', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        _id: '64020888cd8abb571043af8a',
        monthlyIncome: 5000,
        message: '',
      }),
    }));
    const result = await request(app)
      .post('/v1/transaction')
      .send({
        amount: 5000,
        cardData: {
          name: 'Ana',
          numberCard: '5187687071992380',
          expirationDate: '2027-04',
          cvc: '140',
        },
      })
      .expect(201);
    idResult = result.body.id;
  });
  it('Must NOT create a transaction due to invalid entries', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve({
        _id: '64020888cd8abb571043af8a',
        monthlyIncome: 5000,
        message: '',
      }),
    }));
    await request(app)
      .post('/v1/transaction')
      .send()
      .expect(422);
  });
});
describe('GET from /v1/transaction/:id', () => {
  it('Must find a transaction', async () => {
    await request(app)
      .get(`/v1/transaction/${idResult}`)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
  it('Must NOT find a transaction due to invalid entries', async () => {
    await request(app)
      .get(`/v1/transaction/${invalidId}`)
      .expect(500);
  });
});
describe('PATCH from /v1/transaction/:id', () => {
  it('Must update the status of a transaction', async () => {
    await request(app)
      .patch(`/v1/transaction/${idResult}`)
      .send({ status: 'Aprovada' })
      .expect(200);
  });
  it('Must NOT update the status of a transaction due to invalid entries', async () => {
    await request(app)
      .patch(`/v1/transaction/${idResult}`)
      .send({ status: 'Invalid' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toBe('Change not allowed');
      });
  });
});
