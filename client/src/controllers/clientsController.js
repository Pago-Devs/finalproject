/* eslint-disable no-underscore-dangle */
import CryptoJS from 'crypto-js';
import Client from '../model/Client.js';
import generateToken from '../utils/generateToken.js';

function decryptText(params) {
  // APP_SECRET =
  // WHlwdAfmQBWDktJAFyUHf++eIaZCJLbdoT0x9MRdwkK0FT//gPjG
  // lnxsvucvcUZEEqzXgc6fgMUCGvDfITSqIxxyRCxFn3GiuOUaWOnPB3xbnnk
  // EhjufTUYffzwFUoQIwGxUA6en8lm1BlbmHur42iTzFvZTB3TRHLXW/ELEniEDSLzS
  // jASpYRi9PctbUvZ3gE9EOqUGVR5Mt3Z5vORs2I6eow2ju4CyehcrvYDO4vy6+
  // 35CNniN4+ZwLwS+yf/ff9ZH9DaF2zTh++tSKuajJgLlGlJLlPPVoEiqPeafjqWA
  // bnpIBol+21/IFOGLqDqaKoYnobEcAcmLeufYParEPg==
  const decryptTexts = CryptoJS.AES.decrypt(params, process.env.APP_SECRET)
    .toString(CryptoJS.enc.Utf8);
  return decryptTexts;
}

class ClientController {
  static getClientByID = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Client.findById(id);
      const cpf = (result.cpf).slice(0, 3);
      const numberCard = decryptText(result.cardData.numberCard).slice(0, 3);
      const resultSucess = {
        message: 'Success',
        name: result.name,
        cpf: `${cpf}.***.***-**`,
        numberCard: `${numberCard}**************`,
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
        name === clients.cardData.name
        && numberCard === decryptText(clients.cardData.numberCard)
        && expirationDate === decryptText(clients.cardData.expirationDate)
        && cvc === decryptText(clients.cardData.cvc)));

      if (client) {
        const resultSucess = {
          message: 'Success',
          _id: client._id,
          monthlyIncome: client.monthlyIncome,
        };
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
