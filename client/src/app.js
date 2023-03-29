import express from 'express';
import routes from './routes/routes.js';
import db from './config/dbConnect.js';

const app = express();
app.use(express.json());
db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('conexão com o banco feita com sucesso');
});

routes(app);

export default app;
