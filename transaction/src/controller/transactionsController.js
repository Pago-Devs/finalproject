import Transaction from '../model/Transaction.js';

class TransactionController {
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

  // eslint-disable-next-line consistent-return
  static createTransaction = async (req, res) => {
    const response = await fetch('http://pagodevs-client:3001/v1/clients/verify', {
      method: 'GET',
      body: JSON.stringify({
        cardData: req.body.cardData,
      }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    const resultTransaction = await response.json();
    const { clientId, monthlyIncome, message } = resultTransaction;
    // const resultTransaction = { id: '63d94cc7f8c08a1d745cb167', monthlyIncome: 4000 };
    if (message === 'Dados inválidos') return res.status(422).send({ message: 'Dados Inválidos' });

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
        await fetch('http://pagodevs-antifraud:3003/v1/analise/client', {
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
      const result = { id: t.id, status };
      return res.status(201).json(result);
    });
  };
}

export default TransactionController;
