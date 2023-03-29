/* eslint-disable no-unused-vars */
import express from 'express';
import ClientController from '../controllers/clientsController.js';
// import validateClient from '../validations/clientsValidation.js';
import { authLocal, authBearer } from '../middlewares/auth.js';

const router = express.Router();

router
  .post('/clients/login', authLocal, ClientController.login)
  .post('/v1/clients/verify', authBearer, ClientController.findClientByNumberCard)
  .get('/v1/clients/:id', authBearer, ClientController.getClientByID);

export default router;
