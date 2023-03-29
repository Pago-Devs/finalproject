import express from 'express';
import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';

const clientRoutes = express.Router();
const PORT = 3001;

const accountProxy = createProxyMiddleware({
  target: `http://pagodevs-client:${PORT}`,
  changeOrigin: true,
});

const authenticateBearer = passport.authenticate('bearer', { session: false });

clientRoutes
  .post('/clients/login', accountProxy)
  .post('/v1/clients/verify', authenticateBearer, accountProxy)
  .get('/v1/clients/:id', authenticateBearer, accountProxy);

export default clientRoutes;
