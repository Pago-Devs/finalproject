import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/pagodevs-transaction?authSource=admin');
const db = mongoose.connection;

export default db;
