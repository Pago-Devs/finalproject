import dotenv from 'dotenv';
import express from 'express';
import clients from './clientsRoutes.js';

dotenv.config();

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'Clients' });
  });

  app.use(
    express.json(),
    clients,
  );
};

export default routes;
