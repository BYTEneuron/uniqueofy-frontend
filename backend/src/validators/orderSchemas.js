const Joi = require('joi');

const createOrderSchema = Joi.object({
  services: Joi.array()
    .items(
      Joi.object({
        serviceId: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().min(1).required(),
      })
    )
    .min(1)
    .required(),
  serviceDate: Joi.date().greater('now').required(),
  totalAmount: Joi.number().allow(null).optional(),
});

module.exports = {
  createOrderSchema,
};
