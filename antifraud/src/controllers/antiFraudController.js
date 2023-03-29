/* eslint-disable no-underscore-dangle */
import AntiFraud from '../models/antifraud.js';

class antiFraudController {
  static createAnalysis = async (req, res) => {
    const { clientId, id: transactionId } = req.body;
    const newAnalysis = new AntiFraud({ clientId, transactionId });

    try {
      await newAnalysis.save();
      res.status(200).send('Análise anti-fraude criada com sucesso!');
    } catch (err) {
      res.status(500).json({
        message: `${err.message} - Erro ao criar análise anti-fraude!`,
      });
    }
  };

  static listAnalysis = async (req, res) => {
    try {
      const analisysFraud = await AntiFraud.find({ status: 'Em análise' });
      const antiFraudAnalysis = analisysFraud.map((analysis) => ({
        id: analysis._id,
        clientId: analysis.clienteId,
        transactionId: analysis.transactionId,
        status: analysis.status,
      }));
      res.status(200).json(antiFraudAnalysis);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erro ao listar análises anti-fraude!');
    }
  };

  static getDataClient = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const result = await AntiFraud.findById(id);
      const dataClient = await fetch(
        `http://pagodevs-client:3001/v1/clients/${result.clientId}`,
      ).then((response) => response.json());
      res.status(200).json(dataClient);
    } catch (err) {
      res.status(404).json(err.message);
    }
  };
}

export default antiFraudController;
