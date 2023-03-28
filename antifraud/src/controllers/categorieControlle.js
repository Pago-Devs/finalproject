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

  static listOfCategories = async (req, res) => {
    try {
      const analysis = await Category.find({ status: 'Em análise' });
      const CategoryAnalysis = analysis.map((Analysis) => ({
        id: Analysis._id,
        clientId: Analysis.clienteId,
        transactionId: Analysis.transactionId,
        status: Analysis.status,
      }));
      res.status(200).json(CategoryAnalysis);
    } catch (err) {
      console.log(err);
      res.status(500).send('Erro ao listar análises anti-fraude!');
    }
  }
}

export default categoryController;
