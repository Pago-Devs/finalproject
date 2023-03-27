import Client from '../model/Client.js';

class ClientController {
  static async listClients(_req, res) {
    try {
      const client = await Client.find();
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  /*
  static async getMonthlyIncome(req, res) {
    const { cardNumber } = req.body;
    try {
      const client = await Client.findOne({
        where: {
          number = cardNumber,
        },
      });
      return res.status(200).send(client);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  };
  */
}

export default ClientController;
