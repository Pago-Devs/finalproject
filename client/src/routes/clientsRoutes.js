/* eslint-disable no-unused-vars */
import express from 'express';
import passport from 'passport';
import ClientController from '../controllers/clientsController.js';

const router = express.Router();
const authenticateLocal = passport.authenticate('local', { session: false });

router
  .post('/clients/login', authenticateLocal, ClientController.login)
  .post('/v1/clients/verify', ClientController.findClientByNumberCard)
  .get('/v1/clients/:id', ClientController.getClientByID);

export default router;
