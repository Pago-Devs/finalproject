import mongoose from 'mongoose';

const consumerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const ApiConsumer = mongoose.model('apiconsumer', consumerSchema);

export default ApiConsumer;
