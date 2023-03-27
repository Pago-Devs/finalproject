import express from 'express';
import ClientsController from '../controllers/clientsController.js';

const router = express.Router();

router
  .get('/v1/clients/:id', ClientsController.getClientByID);

export default router;
