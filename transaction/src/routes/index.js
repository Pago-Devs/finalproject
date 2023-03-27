import express from 'express';
import transactionRoutes from './transactionRoutes.js';

const routes = (app) => {
  app.use(
    express.json(),
    transactionRoutes,
  );
};

export default routes;
