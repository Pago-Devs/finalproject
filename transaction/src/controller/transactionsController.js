import Transaction from '../model/Transaction.js';

class TransactionController {
  // eslint-disable-next-line consistent-return
  static createTransaction = async (req, res) => {
    // const resultTransaction = await fetch('http://pagodevs-client:3001/v1/clients/verify')
    //   .then((response) => response.json());
    const resultTransaction = { id: '63d94cc7f8c08a1d745cb167', monthlyIncome: 4000 };

    if (!resultTransaction) return res.status(404).send({ message: 'Dados Inválidos' });

    let status = '';
    if ((resultTransaction.monthlyIncome * 0.5) > req.body.amount) {
      status = 'Em análise';
      // const resultAntiFraud = await fetch('http://pagodevs-client:3001/v1/clients/verify')
    //   .then((response) => response.json());
    console.log('testeee');
    } else {
      status = 'Aprovada';
    }
    const transaction = new Transaction({ ...req.body, status, clientId: resultTransaction.id });
    transaction.save((err, t) => {
      if (err) return res.status(500).send({ message: err.message });
      // eslint-disable-next-line no-underscore-dangle
      const result = {id: t.id, status}
      return res.status(201).json( result );
    });
  };
}

export default TransactionController;
