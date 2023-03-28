import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number },
    clientId: { type: String },
    status: { type: String },
    cardData: {
      name: { type: String },
      numberCard: { type: String },
      expirationDate: { type: String },
      cvc: { type: String },
    },
  },
);

const Transaction = mongoose.model('transactions', transactionSchema);

export default Transaction;
