import mongoose from 'mongoose';

const apiConsumersSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },
  },
);

const ApiConsumer = mongoose.model('apiconsumers', apiConsumersSchema);

export default ApiConsumer;
