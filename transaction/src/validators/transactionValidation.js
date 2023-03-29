import Joi from 'joi';

const validateTransaction = (req, res, next) => {
  const cardDataSchema = Joi.object().keys({
    _id: false,
    name: Joi.string()
      .required(),
    numberCard: Joi.string()
      .pattern(/\d{16}/)
      .required(),
    expirationDate: Joi.string()
      .pattern(/^20[2-9][0-9]-(0[1-9]|10|11|12)$/)
      .required(),
    cvc: Joi.string()
      .pattern(/\d{3}/)
      .required(),
  });

  const schema = Joi.object().keys({
    _id: Joi.string(),
    amount: Joi.number()
      .required(),
    clientId: Joi.string(),
    status: Joi.string()
      .pattern(/^(Aprovada|Rejeitada|Em análise)$/),
    cardData: cardDataSchema,
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(422).json({ message: error.message });
  }

  next();

  return true;
};

export default validateTransaction;
