import express from 'express';
import ClientController from '../controllers/clientsController.js';
// import validateClient from '../validations/clientsValidation.js';

const router = express.Router();

router
  .post('/v1/clients/verify', ClientController.findClientByNumberCard)
  .get('/v1/clients/:id', ClientController.getClientByID);

export default router;
