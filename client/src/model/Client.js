import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  _id: false,
  street: { type: String, required: true },
  number: { type: String, required: true },
  complement: { type: String },
  zipCode: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const cardSchema = new mongoose.Schema({
  _id: false,
  numberCard: { type: String, required: true },
  name: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvc: { type: String, required: true },
  dueDate: { type: Number, required: true },
});

const clientSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  monthlyIncome: { type: Number, required: true },
  adress: { type: addressSchema, required: true },
  cardData: { type: cardSchema, required: true },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
