import Client from '../model/clients.js';
import CryptoJS from "crypto-js";

function decryptText(params) {
  const decryptText = CryptoJS.AES.decrypt(params, process.env.APP_SECRET).toString(CryptoJS.enc.Utf8)
  return decryptText;
}
class ClientController {
  static getClientByID = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Client.findById(id);
      const cpf = (result.cpf).slice(0, 3);
      const resultSucess = {
        message: 'Sucess',
        name: result.name,
        cpf: `${cpf}.***.***-**`,
        numberCard: decryptText(result.cardData.numberCard)
      };
      res.status(200).send(resultSucess);
    } catch (error) {
      res.status(404).send({ message: 'Not Found!' });
    }
  };

  static async findClientByNumberCard(req, res) {
    const {
      name, cvc, numberCard, expirationDate,
    } = req.body.cardData;

    try {
      const resulFindAll = await Client.find();

      const client = resulFindAll.find((clients) => (
        numberCard === decryptText(clients.cardData.numberCard)));
      console.log(decryptText(client.cardData.numberCard));

      if(!client) {
          const resultError = {
          message: 'Invalid Data',
          _id: '',
          monthlyIncome: '',
        };
        res.status(404).json(resultError);
      }
      else if((client.cardData.name === name)
      && (expirationDate === decryptText(client.cardData.expirationDate))
      && (cvc === decryptText(client.cardData.cvc))){
        const resultSucess = {
          message: 'Sucess',
          _id: client._id,
          monthlyIncome: client.monthlyIncome,
        };
        console.log(resultSucess);
        res.status(200).send(resultSucess);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static login = async (req, res) => {
    const token = await generateToken(req.user);
    return res.set('Authorization', token).status(204).send();
  };
}

export default ClientController;
