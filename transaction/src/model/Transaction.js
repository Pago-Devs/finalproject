import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number },
    clientId: { type: String },
    status: { type: String },
  },
);

const Transaction = mongoose.model('transactions', transactionSchema);

export default Transaction;
