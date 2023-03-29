import express from 'express';
import passport from 'passport';
import TransactionController from '../controller/transactionsController.js';
import validateTransaction from '../validators/transactionValidation.js';

const router = express.Router();
const authenticateLocal = passport.authenticate('local', { session: false });

router
  .post('/v1/transaction/login', authenticateLocal, TransactionController.login)
  .get('/v1/transaction/:id', TransactionController.findTransactionById)
  .post('/v1/transaction', validateTransaction, TransactionController.createTransaction)
  .patch('/v1/transaction/:id', TransactionController.updateStatus);

export default router;
