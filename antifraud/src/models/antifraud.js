import mongoose from 'mongoose';

const antiFraudSchema = new mongoose.Schema({
  clientId: String,
  transactionId: String,
  status: { type: String, default: 'Em análise' },
});

const AntiFraud = mongoose.model('antiFraud', antiFraudSchema);

export default AntiFraud;
