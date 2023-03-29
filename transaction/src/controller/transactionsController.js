/* eslint-disable consistent-return */
import Transaction from '../model/Transaction.js';
import generateToken from '../utils/generateToken.js';

class TransactionController {
  static login = (req, res) => {
    console.log(req);
    const { id } = req.user;
    const token = generateToken(id);
    res.status(204).set('Authorization', token).send();
  };

  static findTransactionById = (req, res) => {
    const { id } = req.params;
    Transaction.findById(id, (err, transaction) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (transaction === null) {
        return res.status(404).send({ message: 'Transaction not found!' });
      }
      const {
        _id, amount, idClient, status,
      } = transaction;
      return res.status(200).json({
        _id, amount, idClient, status,
      });
    });
  };

  static createTransaction = async (req, res) => {
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

    if (message === 'Invalid Data' || message === 'Not Found!') return res.status(422).send({ message: 'Invalid Data' });

    let links;
    let status = '';
    if ((monthlyIncome * 0.5) <= req.body.amount) {
      status = 'Em análise';
    } else {
      status = 'Aprovada';
    }
    const transaction = new Transaction({ ...req.body, status, clientId });
    transaction.save(async (err, t) => {
      if (err) return res.status(500).send({ message: err.message });
      // eslint-disable-next-line no-underscore-dangle
      if (status === 'Em análise') {
        links = [
          {
            rel: 'self',
            method: 'GET',
            href: `http://pagodevs-transaction:3002/v1/transaction/${t.id}`,
          },
          {
            rel: 'confirmation',
            method: 'PATCH',
            status: 'APROVADA',
            href: `http://pagodevs-transaction:3002/v1/transaction/${t.id}`,
          },
          {
            rel: 'cancellation',
            method: 'PATCH',
            status: 'REJEITADA',
            href: `http://pagodevs-transaction:3002/v1/transaction/${t.id}`,
          },
        ];

        await fetch('http://pagodevs-antifraud:3003/v1/analysis', {
          method: 'POST',
          body: JSON.stringify({
            id: t.id,
            clientId,
          }),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
        });
      }
      links = [
        {
          rel: 'self',
          method: 'GET',
          href: `http://pagodevs-transaction:3002/v1/transaction/${t.id}`,
        },
      ];
      const result = { id: t.id, status, links };
      return res.status(201).json(result);
    });
  };

  static updateStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    Transaction.findById(id, (err, transaction) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (transaction === null) {
        return res.status(404).send({ message: 'Transaction not found!' });
      }
      if (transaction.status !== 'Em análise') {
        return res.status(400).send({ message: 'Change not allowed' });
      }
    });
    if (status === 'Aprovada' || status === 'Rejeitada') {
      Transaction.findByIdAndUpdate(id, { $set: { status } }, (err) => {
        if (!err) {
          return res.status(204).send();
        }
        return res.status(500).send({ message: err.message });
      });
    } else {
      return res.status(400).send({ message: 'Change not allowed' });
    }
  };
}

export default TransactionController;
