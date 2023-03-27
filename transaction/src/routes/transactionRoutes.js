import express from 'express';
import TransactionController from '../controller/transactionsController.js';

const router = express.Router();

router
  .get('v1.0/transaction/:id', TransactionController.findTransactionById);

export default router;
