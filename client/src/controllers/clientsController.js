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
      const numberCard = decryptText(result.cardData.numberCard).slice(0, 3)
      const resultSucess = {
        message: 'Sucess',
        name: result.name,
        cpf: `${cpf}.***.***-**`,
        numberCard: `${numberCard}**************`
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
        name === clients.cardData.name & 
        numberCard === decryptText(clients.cardData.numberCard) & expirationDate === decryptText(clients.cardData.expirationDate) & cvc === decryptText(clients.cardData.cvc)));

      if(client){
        const resultSucess = {
          message: 'Sucess',
          _id: client._id,
          monthlyIncome: client.monthlyIncome,
        };
        console.log(resultSucess);
        res.status(200).send(resultSucess);
      }
      else {
        const resultError = {
        message: 'Invalid Data',
        _id: '',
        monthlyIncome: '',
      };
      res.status(404).json(resultError);
    }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static login = (req, res) => {
    try {
      const { id } = req.user;
      const token = generateToken(id);
      res.status(204).set('Authorization', token).send();
    } catch (error) {
      res.status(500).json(error.message);
    }
  };
}

export default ClientController;
