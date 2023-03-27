import Transaction from '../model/Transaction.js';

class TransactionController {
  static findTransactionById = (req, res) => {
    const { id } = req.params;
    Transaction.findById(id, (err, transaction) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      return res.status(200).json(transaction);
    });
  };
}

export default TransactionController;
