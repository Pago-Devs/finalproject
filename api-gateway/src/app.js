import express from 'express';
import rateLimit from 'express-rate-limit';
import antifraud from './routes/antifraudRoutes.js';
import client from './routes/clientRoutes.js';
import transaction from './routes/transactionRoutes.js';
import './middlewares/authStrategies.js';

const app = express();
const limiter = rateLimit({
  windowMs: 1 * 30 * 1000,
  max: 1,
});

app.use('/', limiter);

app.use('/', antifraud);
app.use('/', client);
app.use('/', transaction);

export default app;
