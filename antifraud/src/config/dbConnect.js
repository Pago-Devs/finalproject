import mongoose from 'mongoose';

mongoose.connect('mongodb://admin:secret@mongodb:27017/pagodevs-antifraud?authSource=admin');

const db = mongoose.connection;

export default db;
