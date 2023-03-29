import express from 'express';
import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';

const antifraudRoutes = express.Router();
const PORT = 3003;

const accountProxy = createProxyMiddleware({
  target: `http://pagodevs-antifraud:${PORT}`,
  changeOrigin: true,
});

const authenticateBearer = passport.authenticate('bearer', { session: false });

antifraudRoutes
  .post('/v1/analysis/login', accountProxy)
  .post('/v1/analysis/', authenticateBearer, accountProxy)
  .get('/v1/analysis/all', authenticateBearer, accountProxy)
  .get('/v1/analysis/dataclient/:id', authenticateBearer, accountProxy)
  .post('/v1/analysis/updatestatus', authenticateBearer, accountProxy);

export default antifraudRoutes;
