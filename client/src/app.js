import express from 'express';
import routes from './routes/routes.js';
import db from './config/dbConnect.js';
import './middlewares/authStrategies.js';

const app = express();
app.use(express.json());
db.on('error', console.log.bind(console, 'Connection Error'));
db.once('open', () => {
  console.log('Db successfully connected');
});

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
