import express from 'express';
// import passport from 'passport';
import { createProxyMiddleware } from 'http-proxy-middleware';

const antifraudRoutes = express.Router();
const PORT = 3003;

const accountProxy = createProxyMiddleware({
  target: `http://pagodevs-antifraud:${PORT}`,
  changeOrigin: true,
});

// const authenticateBearer = passport.authenticate('bearer', { session: false });

antifraudRoutes
  .post('/v1/analysis/login', accountProxy)
  .post('/v1/analysis/', accountProxy)
  .get('/v1/analysis/all', accountProxy)
  .get('/v1/analysis/dataclient/:id', accountProxy)
  .post('/v1/analysis/updatestatus', accountProxy);

export default antifraudRoutes;
