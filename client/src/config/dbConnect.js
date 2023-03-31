import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
mongoose.set('strictQuery', false);
// MONGO_URI="mongodb://admin:secret@mongodb:27017/pagodevs-clients?authSource=admin"
mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;

export default db;
