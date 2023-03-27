import express from 'express'
import db from "./config/dbConnect.js";

const port = process.env.PORT || 3002;
const app = express();

db.on("error", console.log.bind(console, "Erro de conexão"));
db.once("open", () => {
	console.log("conexão com o banco feita com sucesso");
});

app.use(express.json());
app.listen(port, () => {
	console.log(`Servidor escutando em http://localhost:${port}`);
});
