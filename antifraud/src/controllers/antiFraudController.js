/* eslint-disable no-underscore-dangle */
import AntiFraud from '../models/Antifraud.js';
import generateToken from '../utils/generateToken.js';

class antiFraudController {
  static login = (req, res) => {
    try {
      const { id } = req.user;
      const token = generateToken(id);
      res.status(204).set('Authorization', token).send();
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  static createAnalysis = async (req, res) => {
    const { clientId, id: transactionId } = req.body;
    const newAnalysis = new AntiFraud({ clientId, transactionId });

    try {
      const analysis = await newAnalysis.save();
      if (!analysis) {
        res.status(400).send('Not Created');
      } else {
        const linksAnalysis = [
          {
            rel: 'confirmation',
            method: 'PATCH',
            antiFraudID: `${analysis._id}`,
            status: 'APROVADA',
            href: 'http://pagodevs-antifraud:3003/v1/transaction/updatestatus/',
          },
          {
            rel: 'cancellation',
            method: 'PATCH',
            antiFraudID: `${analysis._id}}`,
            status: 'REJEITADA',
            href: 'http://pagodevs-antifraud:3003/v1/transaction/updatestatus/',
          },
        ];
        const result = { msg: 'New anti fraud analysis created successfully', linksAnalysis };
        res.status(201).json(result);
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static listAnalysis = async (_req, res) => {
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
      res.status(500).json({ message: err.message });
    }
  };

  static getDataClient = async (req, res) => {
    const { id } = req.params;
    try {
      const result = await AntiFraud.findOne({ transctionId: id });
      const dataClient = await fetch(
        `http://pagodevs-client:3001/v1/clients/${result.clientId}`,
      ).then((response) => response.json());
      res.status(200).json(dataClient);
    } catch (err) {
      res.status(404).json(err.message);
    }
  };

  static updateAnalysis = async (req, res) => {
    const { transactionId, status } = req.body;
    try {
      const response = await fetch(`http://pagodevs-transaction:3002/v1/transaction/${transactionId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const result = await response.json();

      if (result.status) {
        await AntiFraud.findByIdAndUpdate(response.transactionId, { status });
        res.status(200).json({ message: 'Status updated' });
      } else {
        res.status(response.status).json(result.message);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  };
}

export default antiFraudController;
