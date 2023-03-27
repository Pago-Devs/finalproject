import Client from '../model/client.js';

class ClientController {
  static async listClients(_req, res) {
    try {
      const client = await Client.find();
      return res.status(200).json(client);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static getClientByID = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Client.findById(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send({ message: 'Not Found!' });
    }
  };

  static async findClientByNumberCard(req, res) {
    const { numberCard } = req.body;
    console.log('oi', numberCard);
    try {
      const client = await Client.findOne({
        'cardData.numberCard': numberCard,
      });
      return res.status(200).send(client);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

export default ClientController;
