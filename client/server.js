<<<<<<< HEAD
import dotenv from 'dotenv';
import app from './src/app.js';
import db from './src/config/dbConnect.js';
import routes from './src/routes/routes.js';

<<<<<<<< HEAD:client/server.js
dotenv.config();
========
const app = express();
>>>>>>>> clients:client/index.js

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});

<<<<<<<< HEAD:client/server.js
const port = process.env.CLIENT_PORT;
=======
import app from './index.js';

const port = process.env.PORT || 3001;
>>>>>>> clients

app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});
<<<<<<< HEAD
========
routes(app);

export default app;
>>>>>>>> clients:client/index.js
=======
>>>>>>> clients
