/* eslint-disable no-unused-vars */
import express from 'express';
import ClientController from '../controllers/clientsController.js';

const router = express.Router();

router
  .post('/clients/login', ClientController.login)
  .post('/v1/clients/verify', ClientController.findClientByNumberCard)
  .get('/v1/clients/:id', ClientController.getClientByID);

export default router;
