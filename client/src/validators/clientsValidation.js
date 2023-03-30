import Joi from 'joi';

const validateClient = (req, res, next) => {
  const addressSchema = Joi.object().keys({
    _id: false,
    street: Joi.string()
      .required(),
    number: Joi.string()
      .alphanum()
      .required(),
    complement: Joi.string(),
    zipCode: Joi.string()
      .pattern(/^\d{5}-?\d{3}$/),
    city: Joi.string()
      .required(),
    state: Joi.string()
      .pattern(/(A[CLMP]|BA|CE|DF|ES|GO|M[AGST]|P[ABEIR]|R[JNORS]|S[CEP]|TO)/)
      .required(),
  });

  const cardSchema = Joi.object().keys({
    _id: false,
    numberCard: Joi.string()
      .required()
      .min(16)
      .max(16)
      .pattern(/\d{16}/),
    name: Joi.string()
      .required(),
    expirationDate: Joi.string()
      .pattern(/\d{4}-\d{2}/),
    cvc: Joi.string()
      .min(3)
      .max(3)
      .pattern(/\d{3}/),
    dueDate: Joi.number()
      .required()
      .min(1)
      .max(31),
  });

  const clientSchema = Joi.object().keys({
    id: Joi.string(),
    name: Joi.string()
      .required(),
    cpf: Joi.string()
      .min(11)
      .max(14)
      .pattern(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'br'] } })
      .required(),
    telephone: Joi.string()
      .pattern(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])\d{3}-?\d{4}$/),
    monthlyIncome: Joi.number()
      .min(0),
    address: addressSchema,
    cardData: cardSchema,
  });

  const { error } = clientSchema.validate(req.body);
  if (error) {
    return res.status(422).json({ message: error.message });
  }
  next();
  return true;
};

export default validateClient;
