import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
  consumerName: { type: String, required: true },
  password: { type: String, required: true },
});

const Consumer = mongoose.model('Consumer', consumerSchema);

export default Consumer;
