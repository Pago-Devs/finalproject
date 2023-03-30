/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
import Transaction from '../model/Transaction.js';
import generateToken from '../utils/generateToken.js';

class TransactionController {
  static login = (req, res) => {
    try {
      const { id } = req.user;
      const token = generateToken(id);
      res.status(204).set('Authorization', token).send();
    } catch (error) {
      res.status(500).json(error.message);
    }
  };

  static findTransactionById = async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findById(id);
      if (transaction === null) {
        return res.status(404).json({ message: 'Transaction not found!' });
      }
      const {
        _id, amount, idClient, status,
      } = transaction;
      return res.status(200).json({
        _id, amount, idClient, status,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  static createTransaction = async (req, res) => {
    try {
      const response = await fetch('http://pagodevs-client:3001/v1/clients/verify', {
        method: 'POST',
        body: JSON.stringify({
          cardData: req.body.cardData,
        }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
      const resultTransaction = await response.json();
      const { _id: clientId, monthlyIncome, message } = resultTransaction;

      if (message === 'Invalid Data' || message === 'Not Found!') {
        res.status(422).json({ message: 'Invalid Data' });
      }
      let status = '';
      if ((monthlyIncome * 0.5) <= req.body.amount) {
        status = 'Em análise';
      } else {
        status = 'Aprovada';
      }
      const transaction = new Transaction({ ...req.body, status, clientId });
      const createdTransaction = await transaction.save();
      if (status === 'Em análise' && createdTransaction) {
        await fetch('http://pagodevs-antifraud:3003/v1/analysis', {
          method: 'POST',
          body: JSON.stringify({
            id: createdTransaction._id,
            clientId,
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });
        const linksAnalysis = [
          {
            rel: 'self',
            method: 'GET',
            href: `http://pagodevs-transaction:3002/v1/transaction/${createdTransaction.id}`,
          },
          {
            rel: 'confirmation',
            method: 'PATCH',
            status: 'APROVADA',
            href: `http://pagodevs-transaction:3002/v1/transaction/${createdTransaction.id}`,
          },
          {
            rel: 'cancellation',
            method: 'PATCH',
            status: 'REJEITADA',
            href: `http://pagodevs-transaction:3002/v1/transaction/${createdTransaction.id}`,
          },
        ];
        const result = { id: createdTransaction.id, status, linksAnalysis };
        res.status(200).set('Location', `http://pagodevs-transaction:3002/v1/transaction/${createdTransaction.id}`).json(result);
      } else if (status !== 'Em análise' && createdTransaction) {
        const links = [
          {
            rel: 'self',
            method: 'GET',
            href: `http://pagodevs-transaction:3002/v1/transaction/${createdTransaction.id}`,
          },
        ];
        const result = { id: createdTransaction.id, status, links };
        res.status(201).json(result);
      } else {
        res.status(400).json({ message: 'Not created' });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  static updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const transaction = await Transaction.findById(id);
      if (!transaction) {
        return res.status(404).json({ message: 'Not Found' });
      }
      if (transaction.status !== 'Em análise') {
        return res.status(400).json({ message: 'Change not allowed' });
      }
      if (status !== 'Aprovada' && status !== 'Rejeitada') {
        return res.status(400).json({ message: 'Change not allowed' });
      }
      transaction.status = status;
      await transaction.save();
      return res.status(200).json({ status });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

export default TransactionController;
