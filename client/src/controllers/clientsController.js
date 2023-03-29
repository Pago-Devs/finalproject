/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Client from '../model/clients.js';

function generateToken(consumer) {
  const payload = {
    subject: consumer._id,
  };
  const newToken = jwt.sign(payload, process.env.APP_SECRET, {
    expiresIn: '15m',
  });
  return newToken;
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
        bcrypt.compareSync(numberCard, clients.cardData.numberCard)));
      console.log(client);

      if ((client.cardData.name === name)
      && (bcrypt.compareSync(expirationDate, client.cardData.expirationDate))
      && (bcrypt.compareSync(cvc, client.cardData.cvc))) {
        const resultSucess = {
          message: 'Sucess',
          _id: client._id,
          monthlyIncome: client.monthlyIncome,
        };
        console.log(resultSucess);
        res.status(200).send(resultSucess);
      } else {
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

  static login = async (req, res) => {
    const token = await generateToken(req.user);
    return res.set('Authorization', token).status(204).send();
  };
}

export default ClientController;
