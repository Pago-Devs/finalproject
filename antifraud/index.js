import express from 'express';
import db from './src/config/dbConnect.js';
import routes from './src/routes/index.js';

const port = process.env.PORT || 3003;
const app = express();

db.on('error', console.log.bind(console, 'Connection error'));
db.once('open', () => {
  console.log('Db successfully connected');
});

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});

routes(app);
