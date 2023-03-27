import Client from '../model/client.js';

class ClientsController {
  static getClientByID = async (req, res) => {
    const { id } = req.params;

    try {
      const result = await Client.findById(id);
      res.status(200).send(result);
    } catch (error) {
      res.status(404).send({ message: 'Not Found!' });
    }
  };
}

export default ClientsController;
