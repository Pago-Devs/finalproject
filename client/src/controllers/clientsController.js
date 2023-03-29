/* eslint-disable no-underscore-dangle */
import Client from '../model/clients.js';

class ClientController {
  static getClientByID = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Client.findById(id);
      const resultSucess = {
        message: 'Sucess',
        name: result.name,
        cpf: result.cpf,
        numberCard: result.cardData.numberCard,
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

    const client = await Client.findOne({
      'cardData.numberCard': numberCard,
    });

    if (!client) {
      return res.status(404).json({ message: 'Not Found!' });
    }

    if (client.cardData.cvc === cvc) {
      if (client.cardData.expirationDate === expirationDate) {
        if (client.cardData.name === name) {
          const resultSucess = {
            message: 'Sucess',
            _id: client._id,
            monthlyIncome: client.monthlyIncome,
          };
          return res.status(200).send(resultSucess);
        }
      }
    }
    const resultError = {
      message: 'Invalid Data',
      _id: '',
      monthlyIncome: '',
    };

    return res.status(400).send(resultError);
  }
}

export default ClientController;
