import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    clientId: Number,
    transactionId: Number,
    status: { type: String, default: 'Em análise' },
  },
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
