import express from 'express';
import router from './antiFraudRoutes.js';

const routes = (app) => {
  app.use(express.json(), router);
};

export default routes;
