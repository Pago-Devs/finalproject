import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

export default db;
