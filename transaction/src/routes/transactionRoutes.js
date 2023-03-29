import express from 'express';
import TransactionController from '../controller/transactionsController.js';
import validateTransaction from '../validators/transactionValidation.js';

const router = express.Router();
router
  .get('/v1/transaction/:id', TransactionController.findTransactionById)
  .post('/v1/transaction', validateTransaction, TransactionController.createTransaction)
  .patch('/v1/transaction/:id', TransactionController.updateStatus);

export default router;
