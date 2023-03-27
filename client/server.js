import dotenv from 'dotenv';
import app from './src/app.js';
import db from './src/config/dbConnect.js';

dotenv.config();

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});

const port = process.env.CLIENT_PORT;

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
