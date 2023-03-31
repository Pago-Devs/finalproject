import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import './middlewares/authStrategies.js';

db.on('error', () => { console.log('Connection Error'); });
db.once('open', () => {
  console.log('Db successfully connected!');
});

const app = express();
app.use(express.json());
app.use((err, _req, res, next) => {
  if (err) {
    const { status, message } = err;
    res.status(status).json({ error: message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  next();
});
routes(app);

export default app;
