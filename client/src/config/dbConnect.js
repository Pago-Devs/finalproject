import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

// const DB_HOST = process.env.NODE_ENV === 'test' ? '127.0.0.1' : process.env.DB_HOST;

mongoose.set('strictQuery', false);
mongoose.connect(
  'mongodb://admin:secret@127.0.0.1:27017/pagodevs-mongo?authSource=admin',
);

const db = mongoose.connection;

export default db;
