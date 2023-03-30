import mongoose from 'mongoose';

const apiConsumerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const ApiConsumer = mongoose.model('apiconsumer', apiConsumerSchema);

export default ApiConsumer;
