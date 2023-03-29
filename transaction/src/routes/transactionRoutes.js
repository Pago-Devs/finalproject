import express from 'express';
import passport from 'passport';
import TransactionController from '../controller/transactionsController.js';
import validateTransaction from '../validators/transactionValidation.js';

const router = express.Router();
const authenticateBearer = passport.authenticate('bearer', { session: false });
const authenticateLocal = passport.authenticate('local', { session: false });

router
  .post('/v1/transaction/login', authenticateLocal, TransactionController.login)
  .get('/v1/transaction/:id', authenticateBearer, TransactionController.findTransactionById)
  .post('/v1/transaction', authenticateBearer, validateTransaction, TransactionController.createTransaction)
  .patch('/v1/transaction/:id', authenticateBearer, TransactionController.updateStatus);

export default router;
