import express from 'express';
import ClientController from '../controllers/clientsController.js';

const router = express.Router();

router
  .get('/v1/clients', ClientController.listClients)
  .get('/v1/clients/:cardNumber', ClientController.getMonthlyIncome);

export default router;
