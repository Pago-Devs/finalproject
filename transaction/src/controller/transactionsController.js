import Transaction from '../model/Transaction.js';

class TransactionController {
  static findTransactionById = (req, res) => {
    const { id } = req.params;
    Transaction.findById(id, (err, transaction) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      const {
        _id, amount, idClient, status,
      } = transaction;
      return res.status(200).json({
        _id, amount, idClient, status,
      });
    });
  };
}

export default TransactionController;
