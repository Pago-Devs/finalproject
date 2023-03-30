import express from 'express';
import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';

const transactionRoutes = express.Router();
const PORT = 3002;

const accountProxy = createProxyMiddleware({
  target: `http://pagodevs-transaction:${PORT}`,
  changeOrigin: true,
});

const authenticateBearer = passport.authenticate('bearer', { session: false });

transactionRoutes
  .post('/v1/transaction/login', accountProxy)
  .get('/v1/transaction/:id', authenticateBearer, accountProxy)
  .post('/v1/transaction', authenticateBearer, accountProxy)
  .patch('/v1/transaction/:id', authenticateBearer, accountProxy);

export default transactionRoutes;
