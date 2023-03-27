import express from 'express';
import ClientController from '../controllers/clientsController.js';

const router = express.Router();

router
  .get('/v1/clients', ClientController.listClients)
  .get('/v1/clients/verify', ClientController.findClientByNumberCard)
  .get('/v1/clients/:id', ClientController.getClientByID);

export default router;
