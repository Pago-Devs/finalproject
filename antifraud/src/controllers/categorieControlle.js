import Category from '../models/categories.js';

class categoryController {
  static checkCategories = async (req, res) => {
    const { clientId, transactionId } = req.body;
    const novaAnalise = new Category({ clientId, transactionId });

    try {
      await novaAnalise.save();
      res.status(200).send('Análise anti-fraude criada com sucesso!');
    } catch (err) {
      res.status(500).json({ message: `${err.message} - Erro ao criar análise anti-fraude!`});
    }
  };
}

export default categoryController;
