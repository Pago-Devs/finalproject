import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb://admin:secret@mongodb:27017/pagodevs-transaction?authSource=admin',
);
const db = mongoose.connection;
export default db;
