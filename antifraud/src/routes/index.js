import express from 'express';
import router from './categorieRoute.js';

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({ titulo: 'Projeto Final' });
  });

  app.use(express.json(), router);
};

export default routes;
