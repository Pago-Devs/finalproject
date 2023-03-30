import express from 'express';
import router from './clientsRoutes.js';

const routes = (app) => {
  app.use(express.json(), router);
};

export default routes;
